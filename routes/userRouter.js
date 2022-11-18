const router = require('express').Router()
const userCtrl = require('../controllers/userCtrl')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')
const request = require('request');



router.post('/register', userCtrl.register)
router.post('/activation', userCtrl.activateEmail)
router.post('/login', userCtrl.login)
router.post('/refresh_token', userCtrl.getAccessToken)
router.post('/forgot', userCtrl.fogotPassword)
router.post('/reset',auth, userCtrl.resetPassword)
router.get('/infor', auth, userCtrl.getUserInfor)
router.get('/all_infor',auth, authAdmin, userCtrl.getUsersAllInfor)
router.get('/logout',userCtrl.logout)
router.patch('/update', auth, userCtrl.updateUser)
router.patch('/update_role/:id', auth, authAdmin, userCtrl.updateUsersRole)
router.delete('/delete/:id', auth, authAdmin, userCtrl.deleteUser)
router.patch('/addcart', auth, userCtrl.addCart)
router.get('/history', auth, userCtrl.history)
router.get('/city', (req, res) => {
    request(
      { url: 'https://thongtindoanhnghiep.co/api/city' },
      (error, response, body) => {
        if (error || response.statusCode !== 200) {
          return res.status(500).json({ type: 'error'});
        }

        //console.log(JSON.parse(body))
  
        res.json(JSON.parse(body));
      }
    )
  });
  router.get('/district/:id', (req, res) => {
      const id = req.params.id
      console.log({id})
    request(
      { url: `https://thongtindoanhnghiep.co/api/city/${id}/district` },
      (error, response, body) => {
        if (error || response.statusCode !== 200) {
          return res.status(500).json({ type: 'error'});
        }

        //console.log(JSON.parse(body))
        const district = JSON.parse(body)
  
        res.json(
            {district:district}
        );
      }
    )
  });
  router.get('/ward/:id', (req, res) => {
    const id = req.params.id
    console.log({id})
  request(
    { url: `https://thongtindoanhnghiep.co/api/district/${id}/ward` },
    (error, response, body) => {
      if (error || response.statusCode !== 200) {
        return res.status(500).json({ type: 'error'});
      }

      //console.log(JSON.parse(body))
      const ward = JSON.parse(body)

      res.json(
          {ward:ward}
      );
    }
  )
});

// Social Login
router.post('/google_login', userCtrl.googleLogin)

router.post('/facebook_login', userCtrl.facebookLogin)


module.exports = router