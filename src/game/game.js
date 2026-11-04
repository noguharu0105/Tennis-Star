import { Player } from "./player.js";

export class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");

        // コートの設定
        this.court = {
            left: 50,
            top: 50,
            right: canvas.width - 50,
            bottom: canvas.height - 50
        };

        // プレイヤーの生成
        this.player = new Player(
            canvas.width / 2 - 15,
            canvas.height - 100
        );

        // キー入力の管理
        this.keys = {};

        this.running = false;

        // キーボードイベント
        this.setupControls();
    }

    // 操作設定
    setupControls() {
        window.addEventListener("keydown", (event) => {
            const key = event.key.toLowerCase();

            if (
                ["arrowup", "arrowdown", "arrowleft", "arrowright"].includes(key)
            ) {
                event.preventDefault();
            }

            this.keys[key] = true;
        });

        window.addEventListener("keyup", (event) => {
            const key = event.key.toLowerCase();

            this.keys[key] = false;
        });

        // ウィンドウからフォーカスが外れた場合
        window.addEventListener("blur", () => {
            this.keys = {};
        });
    }

    // ゲームの更新
    update() {
        this.player.move(this.keys, this.court);
    }

    // コートの描画
    drawCourt() {
        const ctx = this.ctx;

        // 背景
        ctx.fillStyle = "#267a45";
        ctx.fillRect(
            0,
            0,
            this.canvas.width,
            this.canvas.height
        );

        // コート
        ctx.fillStyle = "#328fbd";
        ctx.fillRect(
            this.court.left,
            this.court.top,
            this.court.right - this.court.left,
            this.court.bottom - this.court.top
        );

        // コートのライン
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 3;

        ctx.strokeRect(
            this.court.left,
            this.court.top,
            this.court.right - this.court.left,
            this.court.bottom - this.court.top
        );

        // 中央ライン
        ctx.beginPath();

        ctx.moveTo(
            this.canvas.width / 2,
            this.court.top
        );

        ctx.lineTo(
            this.canvas.width / 2,
            this.court.bottom
        );

        ctx.stroke();
    }

    // 描画処理
    draw() {
        this.ctx.clearRect(
            0,
            0,
            this.canvas.width,
            this.canvas.height
        );

        this.drawCourt();

        this.player.draw(this.ctx);
    }

    // ゲームループ
    loop() {
        if (!this.running) return;

        this.update();
        this.draw();

        requestAnimationFrame(() => this.loop());
    }

    // ゲーム開始
    start() {
        if (this.running) return;

        this.running = true;
        this.loop();
    }

    // ゲーム停止
    stop() {
        this.running = false;
    }
}