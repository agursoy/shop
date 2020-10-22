const axios = require('axios');
const crypto = require('crypto');
const FormData = require('form-data');

module.exports = {
  async index(ctx) {
    const body = ctx.request.body
    const url = "https://www.shopier.com/ShowProduct/api_pay4.php"
    const api_key = process.env.shopier_api_key
    const api_secret = process.env.shopier_api_secret
    const random_nr = Math.floor(Math.random() * 10000);

    // create order in strapi
    if(body.items) {
      await strapi.services.order.create({
        order_id: random_nr.toString(),
        order_detail: `
        ---Sipariş---
        ${body.items.map(i => {
        return `${i.title} | fiyat = ${i.price}  adet = ${i.quantity} tutar = ${i.price * i.quantity}
        ${(i.options && i.options.length)?i.options.map(o => { return `${o.title}: ${o.value}`}).join("\n\t"):''}`}).join("\n\t")}

        ---Müşteri---
        İsim: ${body.buyer_name || null}
        Soyisim: ${body.buyer_surname || null}
        Email: ${body.buyer_email || null}

        ---Kargo---
        Adres: ${body.shipping_address || null}
        Şehir: ${body.shipping_city || null}
        Ülke: ${body.shipping_country || null}
        Posta Kodu: ${body.shipping_postcode || null}`
      });
      delete body.items
    }

    // create shopier request
    let formData = new FormData()
    formData.append("API_key", api_key)
    formData.append("random_nr", random_nr)
    formData.append("website_index", "1")
    formData.append("product_type", "1")
    formData.append("platform", "0")
    formData.append("is_in_frame", "0")
    formData.append("modul_version", "1.6")
    formData.append("platform_order_id", random_nr)
    formData.append("product_name", `${process.env.shop_name}: #${random_nr}`)
    formData.append("buyer_account_age", `${random_nr}`)
    formData.append("buyer_id_nr", `${random_nr}`)

    for (let key in body) {
      formData.append(key, body[key])
    }

    let signature = crypto
      .createHmac("sha256", api_secret)
      .update(`${random_nr}${random_nr}${body.total_order_value}${body.currency}`)
      .digest()
      .toString('base64');

    formData.append("signature", signature)

    const { data } = await axios({
      method: 'post',
      url,
      data: formData,
      headers: {
        'Content-Type': `multipart/form-data; boundary=${formData._boundary}`
      }
    })

    ctx.send(data);
  },
};
