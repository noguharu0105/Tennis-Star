import { Game } from "./game/game.js";
import "./styles/style.css";

// Canvasを取得
const canvas = document.getElementById("gameCanvas");

// ゲームを生成
const game = new Game(canvas);

// ゲーム開始
game.start();