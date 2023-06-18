// Estilos CSS mejorados para el componente tree-item
const styles = `
  <style>
    .tree-item {
      position: relative;
      margin-left: 20px;
      padding-left: 20px;
      cursor: pointer;
      list-style-type: none;
    }

    .tree-item:before {
      content: "";
      position: absolute;
      top: 6px;
      left: 0;
      width: 10px;
      height: 10px;
      border: 2px solid #ccc;
      background-color: #fff;
      border-radius: 50%;
      transition: border-color 0.3s ease;
    }

    .tree-item > .tree-item {
      display: none;
      margin-top: 5px;
    }
  </style>
`;


// Importar el template del componente
const template = document.createElement('template');
template.innerHTML = `
  <div class="tree-item">
    <slot></slot>
  </div>
`;

// Definir la clase del componente
class TreeItem extends HTMLElement {
  constructor() {
    super();

    // Crear un Shadow DOM para el componente
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = styles + template.innerHTML;

    // Obtener los elementos secundarios
    const children = this.querySelectorAll('tree-item');

    // Ocultar los elementos secundarios por defecto
    children.forEach((child) => {
      child.style.display = 'none';
    });

    // Agregar el evento click al componente para mostrar/ocultar los elementos secundarios
    this.addEventListener('click', (event) => {
      // Detener la propagación del evento click en los elementos hijos
      if (event.target !== this) {
        event.stopPropagation();
        return;
      }

      children.forEach((child) => {
        child.style.display = child.style.display === 'none' ? 'block' : 'none';
      });
      
      this.style.color = children[0].style.display === 'none' ? 'black' : '#888c88';
      this.classList.toggle('open');
    });
    
  }
}

// Definir la etiqueta personalizada <tree-item>
customElements.define('tree-item', TreeItem);
