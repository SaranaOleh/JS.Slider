//function Slider(cont){
//    this.cont = cont;
//    this.slider = cont.querySelector('.slider');
//    this.slide = cont.querySelectorAll('.slide');
//    this.dirLeft = cont.querySelector('.dir_left');
//    this.dirRight = cont.querySelector('.dir_right');
//    this.points = cont.querySelector('.slider_points');
//    this.animate = null;
//    this.focus = false;
//    this.posOne = 0;
//    this.posTwo = 0;
//    this.dirRight.addEventListener('click',this.slideRight.bind(this));
//    this.dirLeft.addEventListener('click',this.slideLeft.bind(this));
//    this.cont.addEventListener('mouseenter',this.inFocus.bind(this));
//    this.cont.addEventListener('mouseleave',this.outFocus.bind(this));
//    this.createPoint();
//    this.points.addEventListener('click',function(e){
//        console.log(Math.round(e.offsetX/this.point.clientWidth))
//    }.bind(this))
//    setInterval(this.autoSlide.bind(this),4000);
//    
//}
//Slider.prototype.slideRight = function(){
//    if(this.animate!== null) return;
//    var step = 5;
//    var step2 = 1;
//    var marginLeft = 0;
//    this.animate = setInterval(function(){
//        marginLeft-=step;
//        this.slider.style.marginLeft = marginLeft + '%';
//        if(marginLeft==-100){
//            clearInterval(this.animate);
//            this.animate = null;
//            this.slider.style.marginLeft = '';
//            this.slider.appendChild(this.slider.firstElementChild);
//        }
//    }.bind(this),40)
//    var timer2 = setInterval(function(){
//         this.posOne+=step2;
//            this.point.style.marginLeft = this.posOne + '%';
//        if(this.posOne>=(this.posTwo+20)){
//            clearInterval(timer2);
//            this.posTwo+=20;
//            this.point.style.marginLeft = this.posTwo + '%';
//        }
//    }.bind(this),40)
//    if(this.posTwo>=80){
//        var timer3 = setInterval(function(){
//            this.posTwo-=4;
//            this.point.style.marginLeft = this.posTwo + '%';
//            if(this.posTwo<=0){
//                this.posOne = 0;
//                clearInterval(timer3);
//            }
//        }.bind(this),40)
//    }
//}
//Slider.prototype.slideLeft = function(){
//    if(this.animate!== null) return;
//    var step = 5;
//    var step2 = 1;
//    var marginLeft = -100;
//    this.slider.insertBefore(this.slider.lastElementChild, this.slider.firstElementChild);
//    this.slider.style.marginLeft = marginLeft +"%";
//    this.animate = setInterval(function(){
//        marginLeft+=step;
//        this.slider.style.marginLeft = marginLeft + '%';
//        if(marginLeft==0){
//            clearInterval(this.animate);
//            this.animate = null;
//            this.slider.style.marginLeft = '';
//        }
//    }.bind(this),40)
//    var timer2 = setInterval(function(){
//         this.posOne-=step2;
//            this.point.style.marginLeft = this.posOne + '%';
//        if(this.posOne<=(this.posTwo-20)){
//            clearInterval(timer2);
//            this.posTwo-=20;
//            this.point.style.marginLeft = this.posTwo + '%';
//        }
//    }.bind(this),40)
//    if(this.posTwo<=0){
//        var timer3 = setInterval(function(){
//            this.posTwo+=4;
//            this.point.style.marginLeft = this.posTwo + '%';
//            if(this.posTwo>=80){
//                this.posOne = 80;
//                clearInterval(timer3);
//            }
//        }.bind(this),40)
//    }
//}
//Slider.prototype.autoSlide = function(){
//    if(!this.focus) this.slideRight();
//}
//Slider.prototype.inFocus = function(){
//    this.focus = true;
//}
//Slider.prototype.outFocus = function(){
//    this.focus = false;
//}
//Slider.prototype.createPoint = function(){
//    this.width = 100/this.slide.length;
//    this.point = document.createElement('div');
//    this.point.style.width = this.width + '%';
//    this.point.style.height = 20 + 'px';
//    this.point.style.background = 'black';
//    this.point.classList.add = 'point';
//    this.points.appendChild(this.point);
//}
//Slider.prototype.slideTo = function(to){
//    
//}
//var sliderOne = document.querySelector('.slider_cont');
//new Slider(sliderOne);


function Slider(cont){
    this.cont = cont;
    this.slider = cont.querySelector('.slider');
    this.slide = cont.querySelectorAll('.slide');
    this.dirLeft = cont.querySelector('.dir_left');
    this.dirRight = cont.querySelector('.dir_right');
    this.points = cont.querySelector('.slider_points');
    this.animate = null;
    this.focus = false;
    this.createPoint();
    this.activeSlide(this.active = 0);
    this.dirRight.addEventListener('click',function(){this.slideRight();}.bind(this));
    this.dirLeft.addEventListener('click',function(){this.slideLeft();}.bind(this));
    this.cont.addEventListener('mouseenter',this.inFocus.bind(this));
    this.cont.addEventListener('mouseleave',this.outFocus.bind(this));
    this.points.addEventListener('click',function(e){
        this.slideTo(parseInt(e.offsetX/this.point.clientWidth))
        console.log(parseInt(e.offsetX/this.point.clientWidth))
    }.bind(this))
    setInterval(this.autoSlide.bind(this),4000);
    
}
Slider.DEFAULT_SPEED = 5;
Slider.BOOST_SPEED = 20;
Slider.prototype.slideRight = function(boost,end){
    if(this.animate!== null) return;
    var step = boost?Slider.BOOST_SPEED:Slider.DEFAULT_SPEED;
    var marginLeft = 0;
    this.animate = setInterval(function(){
        marginLeft-=step;
        this.slider.style.marginLeft = marginLeft + '%';
        if(marginLeft==-100){
            clearInterval(this.animate);
            this.animate = null;
            this.slider.style.marginLeft = '';
            this.slider.appendChild(this.slider.firstElementChild);
            this.activeSlide(this.active<this.slide.length-1?this.active+1:0);
            if(end) end();
        }
    }.bind(this),40)
}
Slider.prototype.slideLeft = function(boost,end){
    if(this.animate!== null) return;
    var step = boost?Slider.BOOST_SPEED:Slider.DEFAULT_SPEED;
    var marginLeft = -100;
    this.slider.insertBefore(this.slider.lastElementChild, this.slider.firstElementChild);
    this.slider.style.marginLeft = marginLeft +"%";
    this.animate = setInterval(function(){
        marginLeft+=step;
        this.slider.style.marginLeft = marginLeft + '%';
        if(marginLeft==0){
            clearInterval(this.animate);
            this.animate = null;
            this.slider.style.marginLeft = '';
            this.activeSlide(this.active>0?this.active-1:this.slide.length-1);
            if(end) end();
        }
    }.bind(this),40)
}
Slider.prototype.autoSlide = function(){
    if(!this.focus) this.slideRight();
}
Slider.prototype.inFocus = function(){
    this.focus = true;
}
Slider.prototype.outFocus = function(){
    this.focus = false;
}
Slider.prototype.createPoint = function(){
    this.width = 100/this.slide.length;
    this.point = document.createElement('div');
    this.point.style.width = this.width + '%';
    this.point.style.height = 20 + 'px';
    this.point.style.background = 'black';
    this.point.classList.add('point');
    this.point.dataset.active = 0;
    this.points.appendChild(this.point);
}
Slider.prototype.activeSlide = function(pos){
    this.positionLeft = (pos/this.slide.length)*100;
    this.point.style.marginLeft = this.positionLeft + '%';
    this.active = pos;
}
Slider.prototype.slideTo = function(pos){
    if(this.active>pos) this.slideLeft(true,function(){
        this.slideTo(pos);
    }.bind(this));
    if(this.active<pos) this.slideRight(true,function(){
        this.slideTo(pos);
    }.bind(this));
}
var sliderOne = document.querySelector('.slider_cont');
new Slider(sliderOne);