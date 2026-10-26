
//const { ObjectID } = require("mongodb");

module.exports = function(app, passport, db,) {

// normal routes ===============================================================

    // show the home page (will also have our login links)
    

// message board routes ===============================================================

    app.post('/messages', (req, res) => {
      db.collection('messages').save({name: req.body.name, msg: req.body.msg, thumbUp: 0, thumbDown:0}, (err, result) => {
        if (err) return console.log(err)
        console.log('saved to database')
        res.redirect('/profile')
      })
    })

    app.put('/up', (req, res) => {
      console.log(req.body)
      iconicMoment.findOneAndUpdate({ 
       name: req.body.name, msg: req.body.msg
      }, {
        $inc: {
          //thumbUp:req.body.thumbUp + 1
        }
      }, {
        sort: {_id: -1},
        upsert: true
      }, (err, result) => {
        if (err) return res.send(err)
        res.send(result)
      })
    })

    app.put('/down', (req, res) => {
  iconicMoment.findOneAndUpdate({
  name: req.body.name, msg: req.body.msg
  }, {
    $inc: {
      //thumbUp:req.body.thumbUp - 1
    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})

    app.delete('/delete', (req, res) => {
      iconicMoment.findOneAndDelete({
      name: req.body.name, msg: req.body.msg

      }, (err, result) => {
        if (err) return res.send(500, err)
        res.send('Message deleted!')
      })
    })



};

