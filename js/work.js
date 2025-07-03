    /** Переводит экранные координаты (x,y) в координаты viewBox SVG */
    function toSVGCoords(svg, x, y){
      const pt = svg.createSVGPoint();
      pt.x = x; pt.y = y;
      return pt.matrixTransform(svg.getScreenCTM().inverse());
    }

    gsap.registerPlugin(MotionPathPlugin);

    const path       = document.querySelector('#motionPath');
    const svg        = path.ownerSVGElement;
    const buttons    = document.querySelectorAll('.works_more_right_button');
    const ball       = document.querySelector('#ball');
    const lengthMax  = path.getTotalLength();
    let   lenCurrent = 0;                     // текущее положение по длине

    // выставляем шарик в начале
    moveBall(lenCurrent);

    /** Переместить шарик в точку len вдоль пути */
    function moveBall(len){
      const p = path.getPointAtLength(len);
      ball.setAttribute('cx', p.x);
      ball.setAttribute('cy', p.y);
    }

    buttons.forEach(btn=>{
      btn.addEventListener('click',e=>{
        e.preventDefault();

        /* === 1. Центр кнопки в SVG‑координатах === */
        const rect = btn.getBoundingClientRect();
        const svgPoint = toSVGCoords(svg, rect.left + rect.width/2, rect.top + rect.height/2);
        const bx = svgPoint.x, by = svgPoint.y;

        /* === 2. Ищем ближайшую точку пути === */
        let bestLen = 0, min = Infinity;
        for(let i=0;i<=lengthMax;i+=2){
          const p = path.getPointAtLength(i);
          const d2 = (p.x-bx)**2 + (p.y-by)**2;
          if(d2<min){ min=d2; bestLen=i; }
        }

        /* === 3. Смещаем на 11 px по направлению движения === */
        const dir     = bestLen >= lenCurrent ? 1 : -1;
        let   lenTarget = bestLen + dir * 11;
        lenTarget = Math.min(Math.max(lenTarget,0), lengthMax);

        /* === 4. Нормализуем в доли пути и анимируем === */
        gsap.to(ball,{
          duration:3,                       // медленнее = плавнее
          ease:'power1.inOut',
          motionPath:{
            path,
            align:path,
            alignOrigin:[0.5,0.5],
            start: lenCurrent/lengthMax,
            end:   lenTarget /lengthMax
          },
          immediateRender:false,
          onComplete:()=>{ lenCurrent = lenTarget; }
        });
      });
    });