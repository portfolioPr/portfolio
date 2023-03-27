$(function(){

  ScrollTrigger.matchMedia({

    "(min-width: 1025px)": function() {

      /**
       * section design horizon scroll
       */
      const horiScroll = gsap.to('.design .content-item', {
        scrollTrigger: {
            trigger: '.design',
            start: '0 0',
            end: '+=500%',
            pin: true,
            // markers: true,
            scrub:1,
            invalidateOnRefresh: true,
        },
        ease: "none",
        xPercent:-800,
        x:function(){
            return window.innerWidth;
        },
        });


      /**
       * section design horizon scroll animaion
       */
      $('.design .content-item').each(function(i,element){

          child = $(this).find('.txt');

          gsap.set('.design .txt-oh',{})
          gsap.set('.design .txt-oh .txt',{yPercent:100})

          gsap.to(child,{
              scrollTrigger:{
                  trigger:element,
                  start: "left 80%",
                  containerAnimation: horiScroll,
                  // markers:true,

              },
              ease:'none',
              yPercent:0,
              stragger:0.1,
          })       
      })
  
    },

    "(min-width: 768px)": function() {

        /**
         * cursor
         */
          $(window).mousemove(function(e){
            const mouseX = e.clientX;
            const mouseY = e.clientY;
            gsap.to('#cursor',{
                x:mouseX,
                y:mouseY
            })
          })
  
          $('[data-cursor]').hover(function(){
            $('#cursor').addClass('on')
          },function(){
              $('#cursor').removeClass('on')
          })
  
          $('.design .txt-box, .work .txt-box').hover(function(){
            $('#cursor').addClass('none')
            $('#cursor .bg').addClass('on')
            $('#cursor .label').text('VIEw work')
          },function(){
            $('#cursor').removeClass('none')
            $('#cursor .bg').removeClass('on')
            $('#cursor .label').text('')
          })


        /**
         * section visual headline
         */
        const headLine = new SplitType('.visual .headline .txt-oh', { types: 'words, chars', });

        // visualMotion
        visualMotion = gsap.timeline();
        visualMotion
        .set(headLine.words, { yPercent: 100,clipPath: "polygon(0 0,100% 0,100% 0,0 50%)"})
        .set('.visual .headline', { yPercent: 30})
        .set('.design .img-box', { yPercent: 20})

        .addLabel('g')
        .to(headLine.words, {
            yPercent: 0,
            duration: 1,
            ease: "power2.out",
            stagger: {
                from:"random",
                amount:0.1
            },
            webkitClipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        })
        .to('.visual .headline', {ease: "power2.out", yPercent: 0},'g')
        .to('.design .img-box', { ease: "power2.out",yPercent: 0},'g')



      /**
       * service section line
       */
      serviceEl = document.querySelectorAll('.service .service-item')
      serviceEl.forEach(element => {

        gsap.to(element,{
          scrollTrigger:{
          trigger:element,
          start: "top 40%",
          end: "top 40%",
          // markers:true,
          onEnter: function() {

              $(element).addClass('on') 

              gsap.set('.service .service-item .line-top',{'transform':'scaleX(0)'})
              lineEl = gsap.timeline({
                scrollTrigger:{
                  trigger:element,
                  start: "top 40%",
                  end: "top 40%",
                  // markers:true,
                  scrub:'none',
                  ease: "power2.out"
              },
              });

              lineEl
              .to('.service .service-item .line-top',{'transform':'scaleX(1)','background':'#000',stragger:1,duration:1,})

            },
          onEnterBack: function() { 
            $(element).addClass('on') 
            gsap.set('.service .service-item .line-top',{'transform':'scaleX(1)'})

            },
          onLeave: function() { 
            $(element).addClass('on') 
            gsap.set('.service .service-item .line-top',{'transform':'scaleX(1)'})
          },
          onLeaveBack: function() { 
            $(element).addClass('on') 
            gsap.set('.service .service-item .line-top',{'transform':'scaleX(1)'})
          },

          }
        })

      });
    
    },


    "(max-width: 767px)": function() {

    },


    "all": function() {

          /**
           * header menu animation
           */
          gsap.set('.header .gnb .txt-oh',{yPercent:100})
          menuMotion = gsap.timeline({
            paused:true,
          })
          menuMotion
          .set('.header .group-menu',{ 'visibility': 'visible'})
          .set('.header .info',{ opacity:0,yPercent:10})

          .addLabel('f')
          .to('.group-menu .menu-bg',{height:'100%'},'f')
          .to('.header .gnb .txt-oh',{yPercent:0},'f')
          .to('.header .info',{ opacity:1,yPercent:0},'f')


          /**
           * header menu
           */

          $('.header .btn-menu').click(function(e){
              e.preventDefault();

              $('body').toggleClass('notScroll')
              
              if ($('.header .group-menu').hasClass('on')) { 

                menuMotion.reverse()
                $('.header .group-menu').removeClass('on')
                $('header').removeClass('on')

              }else{

                menuMotion.restart()
              $('.header .group-menu').addClass('on')
              $('header').addClass('on')

              }
          })

          $('.gnb .gnb-item').hover(function(){

            $(this).siblings('li').css('opacity','0.1')
            },function(){
            $(this).siblings('li').css('opacity','1')
            
          })


      /**
       * menu 앵커이동
       */
      $('.gnb .gnb-item a').click(function(e){
          e.preventDefault();
          anchor = $(this).attr('href');
          targets = $(anchor).offset().top

          menuMotion.reverse()
          $('.header .group-menu').removeClass('on')
          $('header').removeClass('on')
          $('body').removeClass('notScroll')
          $('html,body').animate({scrollTop:targets-50});
      })


      /**
       * design view page menu 앵커이동
       */
      const urlParams = new URL(location.href).searchParams;

      const name = urlParams.get('section');
      gsap.to(window, {duration: 1, scrollTo:"#"+name});



        /**
         * body theme mode
         */
        theme = gsap.timeline({
            scrollTrigger:{
                trigger:".theme",
                start:"-20% 50%",
                end:"-10% 50%",
                // markers:true,
                scrub:0,
            },
        })

        theme
        .addLabel('a')
        .to('body',{ background:'#000',color:'#fff'},'a')


        /**
         * header theme mode
         */

        $('[data-theme]').each(function(i,element){
          color = $(this).data('theme');

          ScrollTrigger.create({
              trigger:element,
              start:"0% 100%",
              end:"50% 0%",
              // markers:true,
              toggleClass: {targets: "header", className: color}
            }) 
        })


        /**
         * section accent txt-animation
         */
        gsap.to('.accent .group-accent',{
          scrollTrigger:{
              trigger:".accent",
              start:"0% 50%",
              end:"20% 50%",
              // markers:true,
              scrub:0,
              ease: "power2.out"
          },
          'width':'100%'
        })

        
        /**
         * section work animation
         */

        gsap.set('.work .work-item .wrapper',{opacity:0, yPercent:-100})
        workAni = gsap.timeline({
          scrollTrigger:{
            trigger:".work",
            start: "top center",
            end: "center bottom",
            // markers:true,/
        },
        })

        workAni
        .to('.work .work-item .wrapper',{ 
          stagger: 0.5,
          yPercent:0,
          opacity:1,
          ease: "none",
        })


        /**
         * section work img
         */
        $('.work .work-item').each(function(i,element){

            childImg = $(this).find('img');

            gsap.set(childImg,{yPercent:-15})
            gsap.to(childImg,{
              scrollTrigger:{
                  trigger:element,
                  start:"0% 100%",
                  end:"100% 0%",
                  // markers:true,
                  scrub:0.5,
              },
              ease:'none',
              yPercent:0,
          })

      })
        
        /**
          * section work-item hover
          */
        $('.work .work-item').hover(function(){

          childTxt = $(this).find('.txt');
          childImg = $(this).find('img');
          childTag = $(this).find('.tag');

          txtAni = gsap.timeline({})

          txtAni
          .set(childTxt, { yPercent: 100,clipPath: "polygon(0 0,100% 0,100% 0,0 50%)"})
          .set(childTag, { yPercent: 100,clipPath: "polygon(0 0,100% 0,100% 0,0 50%)"})

          .addLabel('w')
          .to(childTxt,{
            yPercent: 0,
            duration: 1,
            ease: "power2.out",
            webkitClipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          },'w')
          .to(childTag,{
            yPercent: 0,
            duration: 1,
            ease: "power2.out",
            webkitClipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          },'w')
          .to(childImg,{'transform':'scale(1.1)'},'w')

        },function(){

          txtAni = gsap.timeline({})
          txtAni
          .to(childImg,{'transform':'scale(1)'})

        })

        /**
         * footer hover
         */
        $('.footer .contact').hover(function(){

          $('.footer .arrow').addClass('on')
        },function(){
          $('.footer .arrow').removeClass('on')
        })



    
    }
  });










 


    
















})