if (document.querySelector('.swiper-container')) {
    //primeiro carrossel
    if (document.getElementById('carrossel-evento-1')) {
        new Swiper('#carrossel-evento-1', {
            navigation: {
                nextEl: '.swiper-button-next-1',
                prevEl: '.swiper-button-prev-1',
            },
            loop: true,
            createElements: false,
        });
    }
    //segundo carrossel
    if (document.getElementById('carrossel-evento-2')) {
        new Swiper('#carrossel-evento-2', {
            navigation: {
                nextEl: '.swiper-button-next-2',
                prevEl: '.swiper-button-prev-2',
            },
            loop: true,
            createElements: false,
        });
    }
}

// devocionais num arquivo .json
let devocionais = {};

if (document.getElementById('calendario-dias')) {
    fetch('devocionais.json')
      .then(response => response.json())
      .then(data => {
        devocionais = data;
        inicializarDevocionais();
      });

    const calendarioMesAno = document.getElementById('calendario-mes-ano');
    const calendarioDias = document.getElementById('calendario-dias');
    const btnPrev = document.querySelector('.cal-btn.prev');
    const btnNext = document.querySelector('.cal-btn.next');
    const devocionalDia = document.getElementById('devocional-dia');
    const devocionalData = document.getElementById('devocional-data');
    const devocionalTitulo = document.getElementById('devocional-titulo');
    const devocionalTexto = document.getElementById('devocional-texto');
    const devocionalLink = document.getElementById('devocional-link');
    const ultimosLista = document.getElementById('devocionais-ultimos-lista');

    let dataAtual = new Date();
    let selecionado = new Date();

    function formatarDataISO(date) {
        return date.toISOString().slice(0, 10);
    }
    function formatarDataBR(date) {
        return date.toLocaleDateString('pt-BR');
    }

    function renderizarCalendario(mes, ano) {
        calendarioDias.innerHTML = '';
        const primeiroDia = new Date(ano, mes, 1);
        const ultimoDia = new Date(ano, mes + 1, 0);
        const hoje = new Date();

        const nomesMeses = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
        calendarioMesAno.textContent = `${nomesMeses[mes]} ${ano}`;

        let diaSemana = primeiroDia.getDay();
        for (let i = 0; i < diaSemana; i++) {
            const vazio = document.createElement('button');
            vazio.className = 'cal-dia vazio';
            vazio.disabled = true;
            calendarioDias.appendChild(vazio);
        }

        for (let d = 1; d <= ultimoDia.getDate(); d++) {
            const btn = document.createElement('button');
            btn.className = 'cal-dia';
            btn.textContent = d;

            const dataBtn = new Date(ano, mes, d);

            if (
                d === hoje.getDate() &&
                mes === hoje.getMonth() &&
                ano === hoje.getFullYear()
            ) {
                btn.classList.add('hoje');
            }
            if (
                d === selecionado.getDate() &&
                mes === selecionado.getMonth() &&
                ano === selecionado.getFullYear()
            ) {
                btn.classList.add('selecionado');
            }

            btn.addEventListener('click', () => {
                selecionado = new Date(ano, mes, d);
                renderizarCalendario(mes, ano);
                mostrarDevocionalDoDia(selecionado);
                mostrarUltimosDevocionais(selecionado);
            });

            calendarioDias.appendChild(btn);
        }
    }

    const devocionalReferencia = document.getElementById('devocional-referencia');

    function mostrarDevocionalDoDia(data) {
        const dataISO = formatarDataISO(data);
        const dev = devocionais[dataISO];
        devocionalData.textContent = formatarDataBR(data);
        if (dev) {
            devocionalTitulo.textContent = dev.titulo;
            devocionalTexto.textContent = dev.texto;
            devocionalReferencia.textContent = dev.referencia || '';
            devocionalLink.href = dev.link;
            devocionalLink.style.display = '';
        } else {
            devocionalTitulo.textContent = 'Sem devocional cadastrada';
            devocionalTexto.textContent = '';
            devocionalReferencia.textContent = '';
            devocionalLink.style.display = 'none';
        }
    }

    function mostrarUltimosDevocionais(data) {
        ultimosLista.innerHTML = '';
        for (let i = 1; i <= 7; i++) {
            const dia = new Date(data);
            dia.setDate(dia.getDate() - i);
            const dataISO = formatarDataISO(dia);
            const dev = devocionais[dataISO];
            const li = document.createElement('li');
            li.innerHTML = `<span class="devocional-data">${dia.getDate().toString().padStart(2, '0')}/${(dia.getMonth()+1).toString().padStart(2, '0')}</span> ${dev ? dev.titulo : 'Sem devocional'}`;
            ultimosLista.appendChild(li);
        }
    }

    btnPrev.addEventListener('click', () => {
        dataAtual.setMonth(dataAtual.getMonth() - 1);
        renderizarCalendario(dataAtual.getMonth(), dataAtual.getFullYear());
    });
    btnNext.addEventListener('click', () => {
        dataAtual.setMonth(dataAtual.getMonth() + 1);
        renderizarCalendario(dataAtual.getMonth(), dataAtual.getFullYear());
    });

    renderizarCalendario(dataAtual.getMonth(), dataAtual.getFullYear());
    mostrarDevocionalDoDia(selecionado);
    mostrarUltimosDevocionais(selecionado);
}

// painel lateral de login
function abrirLoginPopup() {
    const loginPopup = document.getElementById('login-popup');
    const loginOverlay = document.getElementById('login-overlay');
    if (loginPopup) loginPopup.classList.add('ativo');
    if (loginOverlay) loginOverlay.classList.add('ativo');

    const menu = document.querySelector('.top-menu');
    if (menu && menu.classList.contains('menu-aberto')) {
        menu.classList.remove('menu-aberto');
    }
}

function fecharLoginPopup() {
    const loginPopup = document.getElementById('login-popup');
    const loginOverlay = document.getElementById('login-overlay');
    if (loginPopup) loginPopup.classList.remove('ativo');
    if (loginOverlay) loginOverlay.classList.remove('ativo');
}

document.addEventListener('DOMContentLoaded', function() {
    const abrirLogin = document.getElementById('abrir-login');
    const fecharLogin = document.getElementById('login-popup-fechar');
    const overlay = document.getElementById('login-overlay');

    if (abrirLogin) {
        abrirLogin.addEventListener('click', function(e) {
            e.preventDefault();
            abrirLoginPopup();
        });
    }
    if (fecharLogin) {
        fecharLogin.addEventListener('click', fecharLoginPopup);
    }
    if (overlay) {
        overlay.addEventListener('click', fecharLoginPopup);
    }

    // fechar com ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') fecharLoginPopup();
    });

    if (window.location.hash === "#login") {
        abrirLoginPopup();
    }
});

// abre/fecha modal na galeria
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('.galeria-img');
    const modal = document.getElementById('galeria-modal');
    const modalImg = document.getElementById('modal-img');
    const closeBtn = document.getElementById('modal-close');
    const prevBtn = document.getElementById('modal-prev');
    const nextBtn = document.getElementById('modal-next');
    let currentIndex = 0;

    if (images.length && modal) {
        function openModal(index) {
            currentIndex = index;
            modalImg.src = images[index].src;
            modal.classList.add('active');
        }
        function closeModal() {
            modal.classList.remove('active');
            modalImg.src = '';
        }
        function showPrev() {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            modalImg.src = images[currentIndex].src;
        }
        function showNext() {
            currentIndex = (currentIndex + 1) % images.length;
            modalImg.src = images[currentIndex].src;
        }

        images.forEach((img, idx) => {
            img.addEventListener('click', () => openModal(idx));
        });
        closeBtn.addEventListener('click', closeModal);
        prevBtn.addEventListener('click', showPrev);
        nextBtn.addEventListener('click', showNext);

        modal.addEventListener('click', function(e) {
            if (e.target === modal) closeModal();
        });
        document.addEventListener('keydown', function(e) {
            if (!modal.classList.contains('active')) return;
            if (e.key === 'Escape') closeModal();
            if (e.key === 'ArrowLeft') showPrev();
            if (e.key === 'ArrowRight') showNext();
        });
    }
});

// menu hamburguer
document.addEventListener('DOMContentLoaded', function() {
    const btn = document.getElementById('menu-hamburguer');
    const menu = document.querySelector('.top-menu');
    if (btn && menu) {
        btn.addEventListener('click', function() {
            menu.classList.toggle('menu-aberto');
        });
        document.addEventListener('click', function(e) {
            if (!btn.contains(e.target) && !menu.contains(e.target)) {
                menu.classList.remove('menu-aberto');
            }
        });
    }
});