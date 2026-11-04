export class Ball {
    constructor(x, y) {
        // ボールの位置
        this.x = x;
        this.y = y;

        // ボールの大きさ
        this.radius = 10;

        // ボールの移動速度
        this.speedX = 3;
        this.speedY = 3;

        // ボールの色
        this.color = "#f1c40f";
    }

    // ボールの移動
    move(court) {
        this.x += this.speedX;
        this.y += this.speedY;

        // 左右の壁に当たった場合
        if (
            this.x - this.radius <= court.left ||
            this.x + this.radius >= court.right
        ) {
            this.speedX *= -1;
        }

        // 上下の壁に当たった場合
        if (
            this.y - this.radius <= court.top ||
            this.y + this.radius >= court.bottom
        ) {
            this.speedY *= -1;
        }
    }

    // ボールの描画
    draw(ctx) {
        ctx.beginPath();

        ctx.arc(
            this.x,
            this.y,
            this.radius,
            0,
            Math.PI * 2
        );

        ctx.fillStyle = this.color;
        ctx.fill();

        ctx.closePath();
    }
}