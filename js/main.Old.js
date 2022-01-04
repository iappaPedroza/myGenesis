// As variáveis de ordem de exibição do enigma, ordem de clique do usuário e score;
let order = [];
let clickedOrder = [];
let score = 0;
// 0 - Verde; 1 - Vermelho; 2 - Amarelo; 3 - Azul
// nossos botões no stage do game
const blue = document.querySelector('.blue');
const red = document.querySelector('.red');
const yellow = document.querySelector('.yellow');
const green = document.querySelector('.green');

// Função de ordem aleatória de cores do enigma
let shuffleOrder = () => {
    let colorOrder = Math.floor(Math.random() * 4);
    order[order.length] = colorOrder;
    clickedOrder = [];

    for(let i in order) {
        let elementColor = createColorElement(order[i]);
        lightColor(elementColor, Number(i) + 1);
    }
}
// acende a próxima cor
let lightColor = (element, number) => {
    number = number * 500;
    setTimeout(() => {
        element.classList.add('selected');
    }, number - 250);
    setTimeout(() => {
        element.classList.remove('selected');
    });
}
// Checando nossa resposta
let checkOrder = () => {
    for(let i in clickedOrder) {
        if (clickedOrder[i] != order[i]) {
            gameOver();
            break;
        }
    }
    if (clickedOrder.length == order.length) {
        alert(`Pontuação: ${score} \nVocê acertou! Iniciando o próximo nível...`);
        nextLevel();
    }
}

// Funcção para clique do usuário

let click = (color) => {
    clickedOrder[clickedOrder.length] = color;
    createColorElement(color).classList.add('selected');

    setTimeout(() => {
        createColorElement(color).classList.remove('selected');
        checkOrder();
    }, 250);
    
}

// Criar uma função que retorna a cor
let createColorElement = (color) => {
    if (color == 0) {
        return green;
    } else if (color == 1) {
        return red;
    } else if (color == 2) {
        return yellow;
    } else if (color == 3) {
        return blue;
    }
}

// Proximo Nivel
let nextLevel = () => {
    score++;
    shuffleOrder();
}
// Funcção fim de jogo
let gameOver = () => {
    alert(`Pontuação: ${score}! \nVocê perdeu! Clique em OK para reiniciar...`);
    order = [];
    clickedOrder = [];

    playGame();
}
// Inicia o game ou resetar
let playGame = () => {
    alert('Bem-vindo(a) ao Genesis! \n iniciando um novo jogo...');
    score = 0;

    nextLevel();

}
// Instancia a ação de cada botão
green.onClick = () => click(0);
red.onClick = () => click(1);
yellow.onClick = () => click(2);
blue.onClick = () => click(3);

// Inicia o Jogo
playGame();

