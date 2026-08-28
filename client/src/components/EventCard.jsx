import { Link } from "react-router-dom";

export default function EventCard({ event }) {

    return (

        <div className="
            bg-white
            rounded-2xl
            shadow-lg
            overflow-hidden
            hover:-translate-y-2
            transition
            duration-300
        ">

            <img
                src={
                    event.image ||
                    "https://images.unsplash.com/photo-1540575467063-178a50c2df87"
                }
                alt={event.title}
                className="
                    w-full
                    h-48
                    object-cover
                "
            />

            <div className="p-6">

                <span className="
                    inline-block
                    bg-blue-100
                    text-blue-700
                    px-3
                    py-1
                    rounded-full
                    text-sm
                    font-semibold
                ">
                    {event.category}
                </span>


                <h2 className="
                    text-2xl
                    font-bold
                    mt-4
                ">
                    {event.title}
                </h2>


                <p className="
                    text-gray-600
                    mt-2
                ">
                    {event.description}
                </p>


                <div className="
                    mt-4
                    space-y-2
                    text-gray-700
                ">

                    <p>
                        📅{" "}
                        {new Date(
                            event.date
                        ).toLocaleDateString()}
                    </p>

                    <p>
                        📍 {event.venue}
                    </p>

                    <p>
                        👥 Capacity: {event.capacity}
                    </p>

                </div>


                <Link
                    to={`/events/${event._id}`}
                    className="
                        block
                        text-center
                        mt-5
                        bg-blue-600
                        hover:bg-blue-700
                        text-white
                        py-3
                        rounded-xl
                        font-semibold
                    "
                >
                    View Event
                </Link>

            </div>

        </div>

    );

}
