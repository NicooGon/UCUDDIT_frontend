import { useEffect, useRef, useState } from 'react';
import "../Game/Game.css";
import robotImageReverse from '../Game/img/robot-reverse.png'
import soap from '../Game/img/soap.png'
import lemon from '../Game/img/lemon.png'
import jugDetergent from '../Game/img/jugDetergent.png'
import bottleDroplet from '../Game/img/bottleDroplet.png'
import { PauseButton } from '../../atoms/PauseButton';
import { InstructionButton } from '../../atoms/instructionButton';
import Instructions from '../Instructions/Instructions';

export default function Game() 
{
    const canvasRef = useRef(null);
    const ctxRef = useRef(null);
    const robotImage = process.env.PUBLIC_URL + '/robot.png';

    const [points, setPoints] = useState(0);
    const [IconCaught, setIconCaught] = useState(false)
    const [phLevel, setPhLevel] = useState(7.5)
    const [isPaused, setIsPaused] = useState(false); 
    const [information, setInformation] = useState(false);

    const icons = [soap, lemon, jugDetergent, bottleDroplet]
    const [randomIcon, setRandomIcon] = useState(soap)

    const IconImgRef = useRef(new Image()); 

    let marginTop = 0;
    let lastDirection = "right";

    let isHelpPaused = useRef(false);
    let prevSpeedPlayer = useRef();
    let prevSpeedIcon = useRef();

    const player = useRef({
        width: 50,
        height: 50,
        x: 0, 
        y: 0, 
        speed: 2.5,
        dx: 0
    });

    const Icon = useRef({
        width: 50,
        height: 50,
        x: 0,
        y: -30, 
        speed: 1
    });

    const robotImg = new Image();
    robotImg.src = robotImage;

    const robotImgReverse = new Image();
    robotImgReverse.src = robotImageReverse;
    
    useEffect(() => 
    {
        const canvas = canvasRef.current;
        ctxRef.current = canvas.getContext("2d");

        player.current.x = canvas.width / 2 - player.current.width / 2; 
        player.current.y = canvas.height - player.current.height - 60;

        const handleKeyDown = (e) => 
        {
            if (e.key === "ArrowRight" || e.key === "Right") 
            {
                player.current.dx = player.current.speed;
            }
            if (e.key === "ArrowLeft" || e.key === "Left") 
            {
                player.current.dx =- player.current.speed;
            }
        };

        const handleKeyUp = (e) => 
        {
            if (e.key === "ArrowRight" || e.key === "Right" || e.key === "ArrowLeft" || e.key === "Left") 
            {
                player.current.dx = 0;
            }
        };
        
        document.addEventListener("keydown", handleKeyDown);
        document.addEventListener("keyup", handleKeyUp);

        return () => 
        {
            document.removeEventListener("keydown", handleKeyDown);
            document.removeEventListener("keyup", handleKeyUp);
        };
    }, []);

    function drawIconAndPlayer() 
    {
        const ctx = ctxRef.current;
        if (!ctx) return;

        ctx.drawImage(IconImgRef.current, Icon.current.x, Icon.current.y, Icon.current.width, Icon.current.height);

        let imageWidth = 100;
        let imageHeight = 100;

        if (player.current.dx > 0) 
        {
            ctx.drawImage(robotImg, player.current.x, player.current.y, imageWidth, imageHeight);
            lastDirection = "right";
        } 
        else if (player.current.dx < 0) 
        {
            ctx.drawImage(robotImgReverse, player.current.x, player.current.y, imageWidth, imageHeight);
            lastDirection = "left";
        } 
        else 
        {
            ctx.drawImage(lastDirection === "right" ? robotImg : robotImgReverse, player.current.x, player.current.y, imageWidth, imageHeight);
        }
    }

    function movePlayer() 
    {
        player.current.x += player.current.dx;

        if (player.current.x < 0) 
        {
            player.current.x = 0;
        }
        if (player.current.x + player.current?.width > canvasRef.current?.width)
        {
            player.current.x = canvasRef.current?.width - player.current?.width;
        }
    }

    function moveIcon() 
    {
        Icon.current.y += Icon.current.speed;

        if (Icon.current.y > canvasRef.current?.height) 
        {
            if (!IconCaught && IconImgRef.current?.src.includes(soap) || IconImgRef.current?.src.includes(jugDetergent)) 
            {
                marginTop -= 2;
                setPhLevel((ph) => ph + 0.5)

                const lineElement = document.getElementById('line');
                
                if (lineElement) 
                {
                    lineElement.style.marginTop = `${marginTop}rem`;
                }
                setRandomIcon(getRandomIcon())
            }
            else if (!IconCaught && IconImgRef.current?.src.includes(bottleDroplet) || IconImgRef.current?.src.includes(lemon))
            {
                marginTop += 2;
                setPhLevel((ph) => ph - 0.5)

                const lineElement = document.getElementById('line');
                
                if (lineElement) 
                {
                    lineElement.style.marginTop = `${marginTop}rem`;
                }
                setRandomIcon(getRandomIcon())
            }

            setIconCaught(false)
            Icon.current.y = -30;
            Icon.current.x = Math.random() * (canvasRef.current?.width - Icon.current?.width);
        }
    }

    function detectCollision() 
    {
        if 
        (
            player.current.x <= Icon.current.x + Icon.current?.width &&
            player.current.x + player.current?.width >= Icon.current.x &&
            player.current.y <= Icon.current.y + Icon.current?.height &&
            player.current.y + player.current?.height >= Icon.current.y
        ) 
        {
            Icon.current.y = -30;
            Icon.current.x = Math.random() * (canvasRef.current?.width - Icon.current?.width);
            setPoints((prev) => prev + 1);
            setIconCaught(true)
            const newIcon = getRandomIcon();
            setRandomIcon(newIcon);
        }
    }

    useEffect(() => {
        if (isPaused) return;

        if (points > 12) {
            Icon.current.speed = 1.6;
        }
        if (points > 25) {
            Icon.current.speed = 2;
        }
        if (points > 45) {
            Icon.current.speed = 2.3;
            player.current.speed = 3.3;
        }
        if (points > 80) {
            Icon.current.speed = 2.7;
            player.current.speed = 4.0;
        }
        if (points > 120) {
            Icon.current.speed = 3.3;
            player.current.speed = 5;
        }
    }, [points, isPaused]);

    function getRandomIcon()
    {
        return icons[Math.floor(Math.random() * icons.length)]
    }
    
    function clear() 
    {
        ctxRef.current?.clearRect(0, 0, canvasRef.current?.width, canvasRef.current?.height);
    }

    let animationframe;

    function update() 
    {
        if (isPaused) return;
        clear();
        drawIconAndPlayer();
        detectCollision();
        movePlayer();
        moveIcon();
        animationframe = requestAnimationFrame(update);
    }

    useEffect(() => 
    {
        IconImgRef.current.onload = () =>
        {
            if (animationframe)
            {
                cancelAnimationFrame(animationframe)
            }
            update()
        };
    }, []);

    useEffect(() => 
    {
        IconImgRef.current.src = randomIcon;
    },[randomIcon])

    useEffect(() => 
    {
        console.log(phLevel)
        if (phLevel < 6.5) 
        {
            alert('Has perdido. El pH ha bajado demasiado.');
            window.location.reload();
        }
        else if(phLevel > 8.5)
        {
            alert('Has perdido. El pH ha subido demasiado.');
            window.location.reload();
        }
    }, [phLevel]);

    const togglePause = () => 
    {
        if (isHelpPaused.current) return;
    
        setIsPaused((prev) => !prev);
        
        if (!isPaused) 
        {
            prevSpeedPlayer.current = player.current.speed;
            prevSpeedIcon.current = Icon.current.speed;
            player.current.speed = 0;
            Icon.current.speed = 0;
            console.log('juego pausado');
        } 
        else 
        {
            player.current.speed = prevSpeedPlayer.current;
            Icon.current.speed = prevSpeedIcon.current;
            console.log('juego reanudado')
            update();
        }
    };    

    const toggleInstruction = () => 
    {
        if (isHelpPaused.current) return;
        setInformation((prev) => !prev); 
        togglePause();
    };
    
    return (
        <div id='container'>
            {information && (
            <div className="popup-game">
                <div className="popup-inner-game">
                    <Instructions/>
                </div>
            </div>
            )}
            <div id='game'>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width:"100%" }}>
                    <label id='points'>Points: {points}</label>
                    <div id='buttons' style={{display:"flex", gap:"15px"}}>
                        <PauseButton onClick={togglePause} isPaused={isPaused} />
                        <InstructionButton onClickInstruction={toggleInstruction} information={information} />
                    </div>
                </div>
                <div id='background' style={{ display: "flex" }}>
                    <canvas ref={canvasRef} id="gameCanvas" width="800" height="500"></canvas>
                    <div id="ph">
                        <div id="line" className="line"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

