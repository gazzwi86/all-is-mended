/**
 * Main application routes
 */

'use strict';

import nodemailer from 'nodemailer';
import errors from './components/errors';
import path from 'path';

export default function(app) {

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // email user
  app.route('/email')
    .post((req, res) => {

      let transporter = nodemailer.createTransport('smtps://shelley.allismended%40gmail.com:sexyrexy@smtp.gmail.com');
      let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // eslint-disable-line
      let mailOptions = {
        to: 'shelley.allismended@gmail.com',
        from: req.body.name + ' <' + req.body.from + '>',
        subject: 'Website enquiry',
        text: req.body.message,
        html: '<div>Name: ' + req.body.name + '</div>' +
          '<div>Email: ' + req.body.from + '</div>' +
          '<div>Message: ' + req.body.message + '</div>'
      };

      if (
        !req.body.name ||
        req.body.name === '' ||
        !req.body.message ||
        req.body.message === '' ||
        !req.body.from ||
        req.body.from === '' ||
        !re.test(req.body.from)
      ) {
        res.status(400).json('{"success": false}');
      } else {
        transporter.sendMail(mailOptions, function(err, info) {
          if (err) {
            console.log(err);
            res.status(400).json('{"success": false}');
          } else {
            console.log('Message sent: ' + info.response);
            res.status(200).json('{"success": true}');
          }
        });
      }
    });

  // All other routes should redirect to the index.html
  app.route('/*')
    .get((req, res) => {
      res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
    });
}
