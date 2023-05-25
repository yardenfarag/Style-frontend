import axios from 'axios'
import { httpService } from './http.service'

axios.defaults.withCredentials = true

export const productService = {
    query,
    getById,
    save,
    remove,
}

async function query(category = 'coats', filter) {
    return await httpService.get(`products?category=${category}`)
}

async function getById(productId) {
    return await httpService.get(`products/find/${productId}`)
}

async function remove(productId) {
    return await httpService.delete(`products/${productId}`)
}

async function save(product) {
    if (product._id) {
        return await httpService.put(`products/${product._id}`, {product})
    } else {
        return await httpService.post('products', product)
    }
}