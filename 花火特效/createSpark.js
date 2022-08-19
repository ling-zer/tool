
/**
 * 实现点击容器视口，产生花火的特效
 * @param {HTMLElement} container 容器
 */
function zeeSparks(container) {
    if(!container) container = document.getElementsByTagName('body')[0];
    container.addEventListener('click', (e) => {
        // 在点击位置生成花火
        const sparks = createSparks(10, e.pageX, e.pageY);
        container.innerHTML = sparks;
        // 获取视口大小
        const width = container.clientWidth;
        const height = container.clientHeight;
        // 给每一个花火设置定时器，定时改变坐标
        // 1. 每个花火有两个方向的初速度vx, vy
        // 2. 花火产生后，进行物理运动，设加速度为a，方向为垂直向下
        // 3. 花火新的位置：
        //  x += Vx * t; (水平方向匀速运动)
        //  y 方向分情况：默认y方向初速度向上，因为加速度方向向下，所以向上做减速运动
        //  所以可求得：向上的最大距离：s = (Vy^2) / 2a; 当到达最大距离后，Vy变为0，向下加速运动
        //  因此需要累计向上运动阶段的距离，与s比较；
        let interval = 16; // 浏览器每秒刷新60次，因此最好设置为一次的时间，单位ms
        for (const p of container.children) {
            const vx = getV(-200, 200); // 随机产生一个x方向速度
            let vy = getV(10, 100); // 随机产生一个y方向速度，大于0，初速度方向向上
            const a = 10000; // 假设加速度不变
            let [x, y] = [e.pageX, e.pageY]; // 获取点击坐标，注意必须写在for里面，因为每个花火后面改变的数据会不一样
            // vy向上，计算经过多少时间，vy变为0; 得出0 = Vy - at；因此计算向上最大距离为：
            let s = vy * vy / (2 * a); // 所以最多向上运动s距离
            let yy = 0; // 用于累计向上运动的总距离

            let timer = setInterval(() => {
                x += vx * interval / 1000; // 水平方向匀速运动
                if (vy > 0 && yy < s) { // 垂直方向，判断是否已达到最大高度，达到后Vy速度变为0
                    yy += (vy * interval / 1000) - (0.5 * a * (interval / 1000) * (interval / 1000)); // 向上运动时， y = Vyt - 0.5*at^2
                    y = y - yy; // 往上运动阶段 y坐标变小
                } else {  // 往下运动阶段 y = 0.5*at^2
                    vy = 0;
                    y += (0.5 * a * (interval / 1000) * (interval / 1000));
                }
                p.style.transform = `translate(${x}px, ${y}px)` // 改变花火坐标
                if (x < 0 || x >= width || y < 0 || y >= height) { // 超出可视范围
                    clearInterval(timer);
                    p.style.display = 'none'
                }
            }, interval);
        }
    })
    /**
     * 
     * @param {number} num 花火的数量
     * @param {number} x 初始x坐标
     * @param {number} y 初始y坐标
     * @returns 初始位置的花火dom
     */
    function createSparks(num, x, y) {
        let p = '';
        for (let i = 0; i < num; i++) {
            const [r, g, b] = getRGB();
            p += `
                <p class='item' style='width:5px;height:5px;border-radius:50%;position:absolute;background-color: rgb(${r}, ${g}, ${b});\
                transform: translate(${x}px, ${y}px);'/>
            `
        }
        return p;
    }
    /**
     * 随机生成rgb
     * @returns rgb数值
     */
    function getRGB() {
        return [Math.floor(Math.random() * 256), Math.floor(Math.random() * 256), Math.floor(Math.random() * 256)]
    }
    /**
     * 随机生成速度
     * @param {number} min 最小速度
     * @param {number} max 最大速度
     * @returns 
     */
    function getV(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min
    }
}

// export default zeeSparks;
// export {zeeSparks};