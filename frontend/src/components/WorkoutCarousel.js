// ========== [ ///// DEPENDANCIES ///// ] ==========
// ----- libraries -----
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// ----- locals -----
import { updateSelectedWorkout } from '../actions/profileActionCreators';
import useCarousel from '../hooks/useCarousel';
import {
    updateLeftRightIdx,
    updateLeftRightCards
} from '../helpers/carouselHelpers';

// ----- stylesheets -----
import "../css/workout-carousel.css";


// ========== [///// COMPONENT /////] ==========
function WorkoutCarousel() {
    // ----- non-local state -----
    const { workouts } = useSelector(store => store.profile);
    const dispatch = useDispatch();

    // ----- local state -----
    const [carousel, updateCarousel, resetCarousel] = useCarousel({
        position: 0,
        leftRightIdx: [0, 4],
        cardsPositions: [],
        cardClasses: [
            "most-prev-item",
            "prev-item",
            "active",
            "next-item",
            "most-next-item"
        ]
    });

    // ----- functions -----
    async function rotate(dir) {
        let shiftedClasses = carousel.cardClasses;
        let newPosition = carousel.position;
        let newLeft, newRight;

        // ----- shift position -----
        if (dir == "PREV" && carousel.position != 0) {
            newPosition -= 1

            // ----- shift classes -----
            let newRightEnd = shiftedClasses.shift();
            shiftedClasses.push(newRightEnd);

            // ----- shift L&R indicies -----
            [newLeft, newRight] = updateLeftRightIdx(dir, carousel.leftRightIdx);

            // ----- update the carousel -----
            updateCarousel(
                "cardsPositions",
                updateLeftRightCards(carousel.cardsPositions, workouts, newPosition, newLeft, newRight)
            )
            updateCarousel("leftRightIdx", [newLeft, newRight]);
            updateCarousel("cardClasses", shiftedClasses);
            updateCarousel("position", newPosition);
        }
        if (dir == "NEXT" && carousel.position != workouts.length - 1) {
            newPosition += 1

            // ----- shift classes -----
            let newLeftEnd = shiftedClasses.pop();
            shiftedClasses.unshift(newLeftEnd);

            // ----- shift L&R indicies -----
            [newLeft, newRight] = updateLeftRightIdx(dir, carousel.leftRightIdx);

            // ----- update the carousel -----
            updateCarousel(
                "cardsPositions",
                updateLeftRightCards(carousel.cardsPositions, workouts, newPosition, newLeft, newRight)
            )
            updateCarousel("leftRightIdx", [newLeft, newRight]);
            updateCarousel("cardClasses", shiftedClasses);
            updateCarousel("position", newPosition);
        }

        // ----- update selected workout -----
        dispatch(updateSelectedWorkout(workouts[newPosition]))
    }

    // ----- useEffect -----
    useEffect(() => {
        if (workouts[carousel.position]) {
            updateCarousel("cardsPositions", [
                workouts[0 - 2],
                workouts[0 - 1],
                workouts[0],
                workouts[0 + 1],
                workouts[0 + 2]
            ])
            dispatch(updateSelectedWorkout(workouts[carousel.position]));
        } else {
            resetCarousel();
            updateCarousel("cardsPositions", [
                workouts[0 - 2],
                workouts[0 - 1],
                workouts[0],
                workouts[0 + 1],
                workouts[0 + 2]
            ]);
            dispatch(updateSelectedWorkout(workouts[0]));
        }
    }, [workouts])

    // ----- render -----
    return (
        <div className='carousel-container'>
            <div className="workout-carousel">
                <div className={`${carousel.cardsPositions[2] ? 'workout-card' : 'hidden'} ${carousel.cardClasses[2]}`}>
                    <p>{carousel.cardsPositions[2] ? carousel.cardsPositions[2].name : ''}</p>
                </div>
                <div className={`${carousel.cardsPositions[3] ? 'workout-card' : 'hidden'} ${carousel.cardClasses[3]}`}>
                    <p>{carousel.cardsPositions[3] ? carousel.cardsPositions[3].name : ''}</p>
                </div>
                <div className={`${carousel.cardsPositions[4] ? 'workout-card' : 'hidden'} ${carousel.cardClasses[4]}`}>
                    <p>{carousel.cardsPositions[4] ? carousel.cardsPositions[4].name : ''}</p>
                </div>
                <div className={`${carousel.cardsPositions[0] ? 'workout-card' : 'hidden'} ${carousel.cardClasses[0]}`}>
                    <p>{carousel.cardsPositions[0] ? carousel.cardsPositions[0].name : ''}</p>
                </div>
                <div className={`${carousel.cardsPositions[1] ? 'workout-card' : 'hidden'} ${carousel.cardClasses[1]}`}>
                    <p>{carousel.cardsPositions[1] ? carousel.cardsPositions[1].name : ''}</p>
                </div>
            </div >

            {/* controls */}
            {workouts.length >= 1 ?
                <>
                    < div
                        className="slider-control-prev"
                        role="button"
                        onClick={() => rotate("PREV")
                        }
                    ></div >
                    <div
                        className="slider-control-next"
                        role="button"
                        onClick={() => rotate("NEXT")}
                    ></div >
                </>
                : ''
            }

        </div >
    );
}


// ========== [///// EXPORTS /////] ==========
export default WorkoutCarousel;