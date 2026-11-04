export class Player {
    constructor(x, y) {
        // プレイヤーの位置
        this.x = x;
        this.y = y;

        // プレイヤーのサイズ
        this.width = 30;
        this.height = 30;

        // 移動速度
        this.speed = 4;

        // 色
        this.color = "#3498db";
    }

    // プレイヤーの移動
    move(keys, court) {
        let dx = 0;
        let dy = 0;

        // 左右移動
        if (keys["arrowleft"] || keys["a"]) {
            dx -= 1;
        }

        if (keys["arrowright"] || keys["d"]) {
            dx += 1;
        }

        // 上下移動
        if (keys["arrowup"] || keys["w"]) {
            dy -= 1;
        }

        if (keys["arrowdown"] || keys["s"]) {
            dy += 1;
        }

        // 斜め移動の速度調整
        if (dx !== 0 && dy !== 0) {
            dx *= Math.SQRT1_2;
            dy *= Math.SQRT1_2;
        }

        // 座標を更新
        this.x += dx * this.speed;
        this.y += dy * this.speed;

        // コートの外に出ないようにする
        this.x = Math.max(
            court.left,
            Math.min(this.x, court.right - this.width)
        );

        this.y = Math.max(
            court.top,
            Math.min(this.y, court.bottom - this.height)
        );
    }

    // プレイヤーの描画
    draw(ctx) {
        ctx.fillStyle = this.color;

        ctx.fillRect(
            this.x,
            this.y,
            this.width,
            this.height
        );
    }
}