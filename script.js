  slider = document.createElement("DIV");
        slider.setAttribute("class", "img-comp-slider");
        console.log(getId('right'));
        getId('right').style.width = getId('left').offsetWidth;
        function initComparisons() {
            var x, i, c, cc;
            getId('left').style.color = "#808080";
            getId('right').style.color = "#808080";
            x = document.getElementsByClassName("img-comp-overlay");
            for (i = 0; i < x.length; i++) {
                x[i].style.width = "300px";
                compareImages(x[i]);
            }
            function compareImages(img) {
                var clicked = 0,
                    w = img.offsetWidth,
                    h = img.offsetHeight;
                img.style.width = (w / 2) + "px";
                img.parentElement.insertBefore(slider, img);
                img.parentElement.style.width = w;
                img.parentElement.style.height = h;
                slider.style.top = (h / 1) - (slider.offsetHeight / 2) + "px";
                slider.style.left = (w / 2) - (slider.offsetWidth / 2) + "px";
                slider.addEventListener("mousedown", slideReady);
                window.addEventListener("mouseup", slideFinish);
                slider.addEventListener("touchstart", slideReady);
                window.addEventListener("touchstop", slideFinish);
                function slideReady(e) {
                    e.preventDefault();
                    clicked = 1;
                    window.addEventListener("mousemove", slideMove);
                    window.addEventListener("touchmove", slideMove);
                }
                function slideFinish() {
                    clicked = 0;
                }
                function slideMove(e) {
                    var pos;
                    if (clicked == 0) return false;
                    pos = getCursorPos(e)
                    if (pos < 0) pos = 0;
                    if (pos > w) pos = w;
                    slide(pos);
                }
                function getCursorPos(e) {
                    var a, x = 0;
                    e = e || window.event;
                    a = img.getBoundingClientRect();
                    x = e.pageX - a.left;
                    x = x - window.pageXOffset;
                    return x;
                }
                function slide(x) {
                    c = 225 * x / w;
                    cc = 225 - c;
                    getId('right').style.color = "rgb("+c+','+c+','+c+")";
                    getId('left').style.color = "rgb("+cc+','+cc+','+cc+")";
                    img.style.width = x + "px";
                    slider.style.left = img.offsetWidth - (slider.offsetWidth / 2) + "px";
                }
            }
        }
        function getId(ref) {
            return document.getElementById(ref);
        }
        initComparisons();