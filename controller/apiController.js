
const testApi = (req, res) => {
    return res.status(200).json({
        message: 'ok',
        data: 'test api'
    })
}

const handleCreateProduct = (req, res) => {
    console.log("aloalo");
    return res.render('interface.ejs');
}



module.exports = {testApi, handleCreateProduct}