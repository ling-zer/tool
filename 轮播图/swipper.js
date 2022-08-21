/**
 * 
 * @param {HTMLElement} container 用于展示轮播图的容器
 * @param {string[]} imgSrcs 图像地址
 * @param {number} duration 轮播时间（毫秒）
 */
function createSwipper(container, imgSrcs, duration=2000) {

    const width = container.clientWidth;
    const height = container.clientHeight;

    container.innerHTML = createList(imgSrcs, width, height);
    let [leftArrow, rightArrow] = createArrow(container);
    container.innerHTML += leftArrow + rightArrow;

    const ul = document.getElementById('swipperUl');
    const left = document.getElementById('lArrow');
    let right = document.getElementById('rArrow');

    let index = 0;
    let count = imgSrcs.length;
    let timer = null;
    timer = setInterval(play, duration);
    /**
     * 点击左侧箭头
     */
    left.addEventListener('click', function () {
        clearInterval(timer);
        timer = null;
        index--;
        if (index < 0) { // 已经到达第一张，还在点击往左
            index = 5; // 将index设置到最后边的第一张图
            ul.style.transition = 'none'
            animate(index); //无过渡 快速移动到最右边的第一张图
            index = 4;
            setTimeout(() => { // 异步 修改index为最右边实际最后一张图
                ul.style.transition = 'all 1s';
                animate(index); // 有过渡效果移动到最后一张图
            }, 0)
        } else {
            
            animate(index);
        }
        timer = setInterval(play, duration);
    })
    /**
     * 点击右侧箭头
     */
    right.addEventListener('click', () => {
        clearInterval(timer);
        timer = null;
        play();
        timer = setInterval(play, duration);
    })

    /**
     * 从左至右播放
     */
    function play() {
        index++;
        if (index > count) {// 已经到达最后一张图
            index = 0;
            ul.style.transition = 'none'
            animate(index);
            setTimeout(() => {
                index = 1;
                ul.style.transition = 'all 1s'
                animate(index);
            }, 10)
        } else {
            ul.style.transition = 'all 1s'
            animate(index);
        }
    }
    /**
     * 移动ul的偏移量
     * @param {number} index 
     */
    function animate(index) {
        ul.style.transform = `translateX(-${index * width}px)`;
    }

    /**
     * 生成图像列表字符串 ul > li > img
     * @param {string[]} imgSrcs 图像地址
     * @param {number} width 图像大小
     * @param {number} height 
     * @returns 
     */
    function createList(imgSrcs, width, height) {
        let list = '';
        for (let i = 0; i < imgSrcs.length; i++) {
            list += `<li style="float:left;">
                <img src="${imgSrcs[i]}" style="width:${width}px;height:${height}px;"/>
            </li>`
        }
        list += `<li style="float:left;">
                <img src="${imgSrcs[0]}" style="width:${width}px;height:${height}px;"/>
            </li>`
        return `<ul id='swipperUl' style='width:${(imgSrcs.length + 1) * width}px;height:${height}px; list-style: none'>${list}</ul>`
    }
    /**
     * 生成左右箭头
     * @param {HTMLElement} container 
     */
    function createArrow() {

        const style = 'width: 30px;height: 50px;line-height: 50px;background-color: rgba(0, 0, 0, .5);text-align: center;color: #fff;position: absolute;cursor: pointer;';
        let leftArrow = `<p id='lArrow' style='left: 0;top: 50%;transform: translateY(-50%);${style}'>\
                        < </p>`
        let rightArrow = `<p id='rArrow' style='right: 0;top: 50%;transform: translateY(-50%);${style}'>\
                        > </p>`

        return [leftArrow, rightArrow];

    }
}

