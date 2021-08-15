 /**
  * canvas - color - size - clear
  */
 window.addEventListener('load', function() {
    const canvas = document.getElementById('canvasBox'); 
    const ctx = canvas.getContext('2d');
    const increaseBtn  = document.getElementById('increaseBtn');
    const decreaseBtn  = document.getElementById('decreaseBtn');
    const clearBtn  = document.getElementById('clear');

    let x = 0;
    let y = 0;
    let isDrawing = false;

    canvas.addEventListener('mousedown', function(e) {
       x = e.offsetX;
       y  = e.offsetY;
      isDrawing  = true;
    });
    canvas.addEventListener('mousemove', e => {
      if (isDrawing === true) {
        drawLine(ctx, x, y, e.offsetX, e.offsetY);
        x = e.offsetX;
        y = e.offsetY;
      }
    });
    
    window.addEventListener('mouseup', e => {
      if (isDrawing === true) {
        x = 0;
        y = 0;
        isDrawing = false;
      }
    });
    function drawLine(ctx, x1, y1, x2, y2) {
      const color = document.getElementById('color').value;
      const lineWidth = document.getElementById('number');
      ctx.beginPath();
      ctx.strokeStyle = color;
      ctx.lineWidth = number.innerText;
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
      ctx.closePath();
    }
    

    increaseBtn.addEventListener('click',function(){
        const currentLineEle = document.getElementById('number');
        let currentLineWidth = parseInt(currentLineEle.innerText, 10);
        document.getElementById('number').innerText = currentLineWidth+1;
    });

    decreaseBtn.addEventListener('click',function(){
      const currentLineEle = document.getElementById('number');
      let currentLineWidth = parseInt(currentLineEle.innerText, 10);
      if(currentLineWidth-1 >=1){
        document.getElementById('number').innerText = currentLineWidth-1;
      }
  });

  clearBtn.addEventListener('click',function(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

});