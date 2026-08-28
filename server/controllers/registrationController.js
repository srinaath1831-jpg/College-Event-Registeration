const Registration =
  require("../models/Registration");

const Event =
  require("../models/Event");

const QRCode =
  require("qrcode");


exports.registerForEvent =
  async (req, res) => {

    try {

      const { eventId } = req.body;


      const event =
        await Event.findById(eventId);


      if (!event) {

        return res.status(404).json({

          message: "Event not found"

        });

      }


      if (
        new Date() >
        new Date(event.registrationDeadline)
      ) {

        return res.status(400).json({

          message:
            "Registration deadline has passed"

        });

      }


      const existing =
        await Registration.findOne({

          student: req.user.id,

          event: eventId

        });


      if (existing) {

        return res.status(400).json({

          message:
            "Already registered"

        });

      }


      const count =
        await Registration.countDocuments({

          event: eventId,

          status: "registered"

        });


      if (count >= event.capacity) {

        return res.status(400).json({

          message:
            "Event is fully booked"

        });

      }


      const registration =
        await Registration.create({

          student: req.user.id,

          event: eventId

        });


      const qrData =
        JSON.stringify({

          registrationId:
            registration._id,

          eventId,

          studentId:
            req.user.id

        });


      registration.qrCode =
        await QRCode.toDataURL(qrData);


      await registration.save();


      res.status(201).json({

        message:
          "Successfully registered",

        registration

      });

    } catch (error) {

      res.status(500).json({

        message:
          "Registration failed"

      });

    }

  };
