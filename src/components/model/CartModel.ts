import { IProductItem } from "types";

/** Модель корзины */
export class CartModel {
    /** Список товаров в корзине */
    protected _products: IProductItem[] = [];

    /** Списком можно заменить целиком */
    set products(value: IProductItem[]) {
        this._products = value;
    }

    get products(): IProductItem[] {
        return this._products;
    }

    /** Количество товаров в корзине */
    get productsCount(): number {
        return this._products.length;
    }

    /** Общая стоимость товаров в корзине */
    get total(): number {
        return this._products.reduce((sum, item) => sum + item.price, 0);
    }

    /** Добавить товар в корзину (если его там ещё нет) */
    addProduct(product: IProductItem): void {
        if (!this._products.some(item => item.id === product.id)) {
            this._products.push(product);
        }
    }

    /** Удалить товар из корзины */
    deleteProduct(product: IProductItem): void {
        this._products = this._products.filter(item => item.id !== product.id);
    }

    /** Проверяет есть ли продукт в корзине */
    hasProduct(product: IProductItem): boolean {
        return this._products.some(item => item.id === product.id);
    }

    /** Очистить корзину */
    clear(): void {
        this._products = [];
    }
}
