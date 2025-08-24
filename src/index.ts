import './scss/styles.scss';

import { CDN_URL, API_URL } from 'constants/index';
import { EventEmitter } from 'components/base/events';
import { Api } from 'components/Api';
import { AppModel } from 'components/model/AppModel';
import { CartModel } from 'components/model/CartModel';
import { CheckoutModel } from 'components/model/CheckoutModel';

import { ensureElement } from 'utils/utils';

import { IProductItem, IUpdateFieldEvent } from 'types';

import { ProductView } from 'components/View/ProductView';
import { ProductDetailsView } from 'components/View/ProductDetailsView';
import { CartView } from 'components/View/CartView';
import { CartItemView } from 'components/View/CartItemView';
import { ModalView } from 'components/View/ModalView';
import { OrderView } from 'components/View/OrderView';
import { ContactsView } from 'components/View/ContactsView';
import { SuccessView } from 'components/View/SuccessView';

const cardCatalogTemplate = document.querySelector('#card-catalog') as HTMLTemplateElement;
const productDetailsTemplate = document.querySelector('#card-preview') as HTMLTemplateElement;
const productTemplate = document.querySelector('#basket') as HTMLTemplateElement;
const cartItemTemplate = document.querySelector('#card-basket') as HTMLTemplateElement;
const orderTemplate = document.querySelector('#order') as HTMLTemplateElement;
const contactsTemplate = document.querySelector('#contacts') as HTMLTemplateElement;
const successTemplate = document.querySelector('#success') as HTMLTemplateElement;

const events = new EventEmitter();
const apiModel = new Api(CDN_URL, API_URL);

// Models
const appModel = new AppModel(events);
const cartModel = new CartModel();
const checkoutModel = new CheckoutModel(events);

// Views
const cartView = new CartView(productTemplate, events);
const modalView = new ModalView(ensureElement<HTMLElement>('#modal-container'), events);
const orderView = new OrderView(orderTemplate, events);
const contactsView = new ContactsView(contactsTemplate, events);


// Валидаторы
events.on('checkout:contactsErrors', (errors: string[]) => {
  contactsView.valid = !errors.length;
  contactsView.renderErrors(errors.join('; '));
});

events.on('checkout:orderErrors', (errors: string[]) => {
  orderView.valid = !errors.length;
  orderView.renderErrors(errors.join('; '));
});

// Обработка изменения и проверки полей
events.on('order:fieldChange', (event: IUpdateFieldEvent) => {
  checkoutModel.updateField(event.field, event.value)
});

events.on('contacts:fieldChange', (event: IUpdateFieldEvent) => {
  checkoutModel.updateField(event.field, event.value)
});

// Изменение способа оплаты
events.on('order:paymentChange', (button: HTMLButtonElement) => {
  checkoutModel.orderData.payment = button.name;
});

// Открытие модалки корзины
events.on('cart:open', () => {
  const cartItems = cartModel.products.map((product, index) => {
    const cartItem = new CartItemView(cartItemTemplate, events, {
      onClick: () => events.emit('cart:itemRemove', product)
    });
    return cartItem.render(product, index + 1);
  });

  cartView.setItems(cartItems);
  cartView.updateTotal(cartModel.total);
  modalView.setContent(cartView.render());
  modalView.open();
});

// Удаление товара из корзины
events.on('cart:itemRemove', (product: IProductItem) => {
  cartModel.deleteProduct(product);
  cartView.updateCounter(cartModel.productsCount);
  cartView.updateTotal(cartModel.total);

  const cartItems = cartModel.products.map((item, index) => {
    const cartItem = new CartItemView(cartItemTemplate, events, {
      onClick: () => events.emit('cart:itemRemove', item)
    });
    return cartItem.render(item, index + 1);
  });

  cartView.setItems(cartItems);
});

// Модалки оформления заказа и контактов
events.on('contacts:open', () => {
  checkoutModel.totalAmount = cartModel.total;
  modalView.setContent(contactsView.render());
  modalView.open();
});

events.on('order:open', () => {
  checkoutModel.setOrderIds(cartModel.products.map(item => item.id))
  modalView.setContent(orderView.render());
  modalView.open();
});

// Вывод списка товаров (рендер каталог)
events.on('productList:updated', () => {
  const gallery = ensureElement<HTMLElement>('.gallery');
  gallery.innerHTML = '';
  appModel.productList.forEach(item => {
    const productView = new ProductView(cardCatalogTemplate, events, {
      onClick: () => events.emit('product:select', item)
    });
    gallery.append(productView.render(item));
  });
});

// Работа с выбранным продуктом
events.on('product:select', (item: IProductItem) => {
  appModel.activeProduct = item;
});

events.on('productModal:open', (item: IProductItem) => {
  const productDetailsView = new ProductDetailsView(productDetailsTemplate, events);
  modalView.setContent(productDetailsView.render(item, cartModel.products));
  modalView.open();
});

// Работа с корзиной (добавление товара)
events.on('product:addToCart', () => {
  cartModel.addProduct(appModel.activeProduct);
  cartView.updateCounter(cartModel.productsCount);
  modalView.close();
});

// Заказ и успешное завершение
events.on('success:open', () => {
  apiModel.placeOrder(checkoutModel.orderData)
    .then(() => {
      cartModel.clear();
      cartView.updateCounter(cartModel.productsCount);
      const successView = new SuccessView(successTemplate, events);
      modalView.setContent(successView.render(checkoutModel.totalAmount));
      modalView.open();
    })
    .catch(error => console.error(error));
});

events.on('success:close', () => {
  orderView.clear();
  contactsView.clear();
  modalView.close();
});

// Стартовая загрузка каталога
apiModel.getProductList()
  .then((data: IProductItem[]) => {
    appModel.productList = data;
  })
  .catch(error => console.error(error));
