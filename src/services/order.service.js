import api from "../api/api";

export async function createOrder({
    shippingData,
    cart
}) {

    const payload = {
        customerName: shippingData.name,
        customerLastName: shippingData.lastName,
        customerPhone: shippingData.phone,

        department: shippingData.department,
        province: shippingData.province,
        district: shippingData.district,
        ubigeo: shippingData.ubigeo,

        address: shippingData.address,
        reference: shippingData.reference,

        items: cart.map(item => ({
            productId: item.productId,
            sizeId: item.sizeId,
            quantity: item.quantity
        }))
    };

    const { data } = await api.post("/orders", payload);

    return data;
}