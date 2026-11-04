export class Ball {
    constructor(x, y) {
        // ボールの位置
        this.x = x;
        this.y = y;

        // ボールの大きさ
        this.radius = 10;

        // 移動速度
        this.speedX = 3;
        this.speedY = 3;

        // 色
        this.color = "#f1c40f";

        // 発射状態
        this.launched = false;
    }

    // ボールを発射
    launch() {
        if (this.launched) return;

        this.launched = true;
    }

    // ボールの移動
    move(court) {
        if (!this.launched) return;

        this.x += this.speedX;
        this.y += this.speedY;

        // 左右の壁
        if (
            this.x - this.radius <= court.left ||
            this.x + this.radius >= court.right
        ) {
            this.speedX *= -1;
        }

        // 上下の壁
        if (
            this.y - this.radius <= court.top ||
            this.y + this.radius >= court.bottom
        ) {
            this.speedY *= -1;
        }
    }

    // プレイヤーとの衝突判定
    checkPlayerCollision(player) {
        if (!this.launched) return;

        const closestX = Math.max(
            player.x,
            Math.min(this.x, player.x + player.width)
        );

        const closestY = Math.max(
            player.y,
            Math.min(this.y, player.y + player.height)
        );

        const dx = this.x - closestX;
        const dy = this.y - closestY;

        if (dx * dx + dy * dy < this.radius * this.radius) {
            // ボールを上方向に打ち返す
            this.speedY = -Math.abs(this.speedY);

            // 横方向にも少し変化をつける
            this.speedX = dx * 0.3;

            // 連続衝突を防ぐ
            this.y = player.y - this.radius;
        }
    }

    // 描画
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