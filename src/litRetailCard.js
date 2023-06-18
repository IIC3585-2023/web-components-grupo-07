import { html, css, LitElement } from 'lit';
import { SVG_EMPTY_STAR, SVG_SOLID_STAR } from './constants.js';

class RetailCard extends LitElement {
  static styles = css`
    :host {
      display: block;
      font-family: 'Roboto', sans-serif;
    }

    h1,
    h2 {
      margin: 0;
    }

    .card-image {
      position: relative;
    }

    .product-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .eco-img {
      position: absolute;
      top: 0.5rem;
      right: 0.5rem;
      width: 5rem;
      height: 5rem;
    }

    .card {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      width: 30rem;
      border-radius: 0.5rem;
      box-shadow: 0 0 0.5rem 0.1rem rgba(0, 0, 0, 0.2);
      overflow: hidden;
      padding: 0.5rem 1rem;
    }

    .card-content > div {
      padding: 0.5rem;
    }

    .card-header {
      border-bottom: 1px solid #bdc3c7;

    .card-brand {
      font-size: 1rem;
      font-weight: 400;
      color: #bdc3c7;
      margin: 0;
    }

    .card-subtitle {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
    }

    .card-discount {
      border-radius: 0.5rem;
      background-color: #2ecc71;
      color: white;
      padding: 0.25rem 0.5rem;
      margin-right: 0.5rem;
    }

    .card-rating {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      color: #f1c40f;
      padding: 0.5rem;
    }

    .card-description {
      font-size: 0.8rem;
      font-weight: 300;
      color: #bdc3c1;
    }

    .price-container {
      display: flex;
      align-items: center;
    }

    .original-price {
      text-decoration: line-through;
      font-size: 1rem;
      color: #bdc3c1;
      margin: 0rem 0.5rem;
    }

    .discounted-price {
      font-size: 1.2rem;
      font-weight: 500;
      margin: 0rem 0.5rem;
    }
  `;

  static get properties() {
    return {
      imgUrl: { type: String },
      brand: { type: String },
      name: { type: String },
      price: { type: Number },
      description: { type: String },
      ratingStyle: { type: String },
      ecofriendly: { type: Boolean },
      rating: { type: Number },
      discount: { type: Number },
      currency: { type: String },
    };
  }

  constructor(
    imgUrl,
    brand,
    name,
    price,
    description,
    ratingStyle,
    ecofriendly,
    rating,
    discount,
    currency
  ) {
    super();
    this.imgUrl =
      imgUrl ||
      'https://t4.ftcdn.net/jpg/02/51/95/53/360_F_251955356_FAQH0U1y1TZw3ZcdPGybwUkH90a3VAhb.jpg';
    this.brand = brand || 'Brand Name';
    this.name = name || 'Product Name';
    this.price = price || 0;
    this.description = description || 'Product description';
    this.ratingStyle = ratingStyle || 'star-1';
    this.ecofriendly = ecofriendly || false;
    this.rating = rating || -1;
    this.discount = discount || 0;
    this.currency = currency || '$';
  }

  renderRatingStars() {
    const stars = [];
    for (let i = 0; i < this.rating; i++) {
      stars.push(SVG_SOLID_STAR);
    }
    if (this.ratingStyle === 'star-2') {
      for (let i = 0; i < 5 - this.rating; i++) {
        stars.push(SVG_EMPTY_STAR);
      }
    }
    return stars;
  }

  renderEcoFriendly() {
    if (this.ecofriendly) {
      return html`<img class="eco-img" src="/eco.png" alt="Eco-friendly" />`;
    }
    return '';
  }

  render() {
    const discountedPrice = (this.price * (100 - this.discount)) / 100;

    return html`
      <div class="card">
        <div class="card-image">
          <img class="product-img" src=${this.imgUrl} alt=${this.name} />
          ${this.renderEcoFriendly()}
        </div>
        <div class="card-content">
          <div class="card-header">
            <h2 class="card-brand">${this.brand}</h2>
            <h1 class="card-title">${this.name}</h1>
            <div class="card-subtitle">
              <div class="card-discount">${this.discount}%</div>
              <div class="price-container">
                <div class="original-price">${this.currency}${this.price}</div>
                <div class="discounted-price">
                  ${this.currency}${discountedPrice}
                </div>
              </div>
            </div>
          </div>
          <div class="card-body">
            <div class="card-description">${this.description}</div>
          </div>
          <div class="card-footer">
            <div class="card-rating">${this.renderRatingStars()}</div>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('retail-card', RetailCard);
