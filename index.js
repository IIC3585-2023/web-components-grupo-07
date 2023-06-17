import { html, css, LitElement } from './node_modules/lit';
import { styleMap } from './node_modules/lit/directives/style-map.js';

class MiComponente extends LitElement {
  static styles = css`
    :host {
      display: block;
      /* Agrega aquí los estilos personalizados para tu componente */
    }

    .rating {
    }

    .star {
      color: gold;
    }
  `;

  static properties = {
    rating: { type: Number },
    discount: { type: Number },
  };

  render() {
    const ratingStyle = {
      '--rating': this.rating ? `${this.rating}px` : undefined,
    };

    const discountPercentage = this.discount ? `${this.discount}%` : '';

    return html`
      <div style=${styleMap(ratingStyle)}>
        ${this.renderRatingStars()}
      </div>
      <div class="discount">${discountPercentage}</div>
    `;
  }

  renderRatingStars() {
    const stars = [];

    for (let i = 0; i < 5; i++) {
      const starClass = {
        star: i < this.rating,
      };

      stars.push(html`<span class=${styleMap(starClass)}>&#9733;</span>`);
    }

    return html`${stars}`;
  }
}

customElements.define('mi-componente', MiComponente);
