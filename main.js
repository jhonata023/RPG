const personagem = document.querySelector('#personagem');
const npc = document.querySelector('#npc');
const lifeNpcHtml = document.querySelector('.life');
const lifeHtml = document.querySelector('.life2');
const conteudo = document.querySelector('#conteudo');
const life3 = document.querySelector('#life3');
const bag = document.querySelector('#bag');

let monstros = 0;
let range = false;
let lifeNpc = 100;
let lifePersonagem = 100;

let positionBottom = parseInt(window.getComputedStyle(personagem).bottom.replace('px', ''));
let positionLeft = parseInt(window.getComputedStyle(personagem).left.replace('px', ''));

const tempo = setInterval(() => {
    let npcLeft = parseInt(window.getComputedStyle(npc).left.replace('px', ''));
    let npcBottom = parseInt(window.getComputedStyle(npc).bottom.replace('px', ''));

    if (positionBottom >= (npcBottom - 80) && positionBottom <= (npcBottom + 80) &&
        positionLeft <= (npcLeft + 80) && positionLeft >= (npcLeft - 80)) {
        animacaoAtaque(npc);
        bater(npc);

        range = true;
    }

    if (range) {
        if ((positionBottom + 80) < npcBottom) {
            npcBottom -= 10;
            npc.style.bottom = npcBottom + 'px';
        }
        if ((positionBottom + 80) > npcBottom) {
            npcBottom += 10;
            npc.style.bottom = npcBottom + 'px';
        }
        if ((positionLeft - 80) < npcLeft) {
            npcLeft -= 10;
            npc.style.left = npcLeft + 'px';
        }
        if ((positionLeft + 80) > npcLeft) {
            npcLeft += 10;
            npc.style.left = npcLeft + 'px';
        }
    }

    
}, 1000)

document.addEventListener('keydown', (e) => {
    if (e.code == "ArrowUp") {
        subir();
    } 
    if (e.code == 'ArrowRight') {
        direita();
    } 
    if (e.code == 'ArrowDown') {
        descer();
    } 
    if (e.code == 'ArrowLeft') {
        esquerda();
    }
    if (e.code == 'KeyB') {
        if (bag.classList.contains('none')) {
            bag.classList.remove('none');
        } else {
            bag.classList.add('none');
        }
    }
})

document.addEventListener('keyup', (e) => {
    let npcLeft = parseInt(window.getComputedStyle(npc).left.replace('px', ''));
    let npcBottom = parseInt(window.getComputedStyle(npc).bottom.replace('px', ''));

    let lifePositionLeft = parseInt(window.getComputedStyle(life3).left.replace('px', ''));
    let lifePositionBottom = parseInt(window.getComputedStyle(life3).bottom.replace('px', ''));


    if (e.code == 'Space') {
        if (positionBottom >= (npcBottom - 80) && positionBottom <= (npcBottom + 80) &&
            positionLeft <= (npcLeft + 80) && positionLeft >= (npcLeft - 80)) {
            bater(personagem);
            animacaoAtaque(personagem);
        }

        if (positionBottom >= (lifePositionBottom - 50) && positionBottom <= (lifePositionBottom + 50) &&
            positionLeft <= (lifePositionLeft + 50) && positionLeft >= (lifePositionLeft - 50)) {
            pegar();
        }
    }
})

bag.addEventListener('click', (e) => {
    if (e.target.classList.contains('poison-life')) {
        recuperar();
        bag.removeChild(e.target)
    }
})

function subir() {
    if (positionBottom == 405) {
        positionBottom = 405;
    } else {
        positionBottom += 10;
        personagem.style.bottom = positionBottom + 'px';
    }
}
function descer() {
    if (positionBottom == 5) {
        positionBottom = 5;
    } else {
        positionBottom -= 10;
        personagem.style.bottom = positionBottom + 'px';
    }
}
function direita() {
    if (positionLeft == 710) {
        positionLeft = 710;
    } else {
        positionLeft += 10;
        personagem.style.left = positionLeft + 'px';
    }
}
function esquerda() {
    if (positionLeft == 90) {
        positionLeft = 90;
    } else {
        positionLeft -= 10;
        personagem.style.left = positionLeft + 'px';
    }
}

function bater(quem) {
    if (quem == personagem) {
        lifeNpc -= 10;
        lifeNpcHtml.innerText = 'Life ' + lifeNpc;
        if (lifeNpc <= 0) {
            lifeNpc = 100;
            lifeNpcHtml.innerText = 'Life ' + lifeNpc;
            npc.style.bottom = aleatorio(5, 405) + 'px';
            npc.style.left = aleatorio(90, 710) + 'px';
            monstros += 1;
            document.querySelector('#monstros').innerText = 'Monstros: ' + monstros;
            range = false;
            poison();
        }
    } if (quem == npc) {
        lifePersonagem -= 10;
        lifeHtml.innerText = 'Life ' + lifePersonagem;
        if (lifePersonagem <= 0) {
            location.reload();
        }
    }
}
function aleatorio(a, b) {
    return Math.floor(Math.random() * (b - a + 1)) + a;
}
function animacaoAtaque(quem) {
    if (quem == personagem) {
        personagem.classList.add('ataque');
        setTimeout(() => {
            personagem.classList.remove('ataque');
        },200)
    }
    if (quem == npc) {
        npc.classList.add('ataque-caveira');
        setTimeout(() => {
            npc.classList.remove('ataque-caveira');
        },500)
    }
}
function recuperar() {
    lifePersonagem = 100;
    lifeHtml.innerText = 'Life ' + lifePersonagem;
    // life3.style.display = 'none';
    // conteudo.removeChild(life3);
}
function poison() {
    let valor = aleatorio(1, 5);
    console.log('valor ' + valor);
    if (valor == 1) {
        life3.style.bottom = aleatorio(5, 405) + 'px';
        life3.style.left = aleatorio(90, 710) + 'px';
        conteudo.appendChild(life3);
    }
}
function pegar() {
    conteudo.removeChild(life3);
    bag.innerHTML += `<img src="/arquivos/pocao.png" class="poison-life">`;
}