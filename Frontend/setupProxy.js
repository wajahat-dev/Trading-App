const proxy = require("http-proxy-middleware")
module.exports = app => {
    app.use(
        proxy('/ApplicationAPI/API/2.0/Purchase/DoMWalletTransaction',
            {
                target: 'https://sandbox.jazzcash.com.pk',
                secure: false,
                changeOrigin: true
            })
    )
}