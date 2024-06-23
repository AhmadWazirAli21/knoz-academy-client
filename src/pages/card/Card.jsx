import React from 'react'
import { FaStar } from 'react-icons/fa'
import $ from 'jquery';
import './card.css'

export default function Card({name,photo,desc}) {
    return (
        <div className='student-card'>
            <div className="first-line">
                <div className="avatar">
                    <img src={photo} alt="" />
                </div>
                    <h3>{name}</h3>
                <div className="stars">
                    <FaStar onClick={(e) => $(e.target).css('color','#ffcc00')}/>
                    <FaStar onClick={(e) => $(e.target).css('color','#ffcc00')} />
                    <FaStar onClick={(e) => $(e.target).css('color','#ffcc00')} />
                    <FaStar onClick={(e) => $(e.target).css('color','#ffcc00')} />
                    <FaStar onClick={(e) => $(e.target).css('color','#ffcc00')} />
                </div>
            </div>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Labore, neque ea alias placeat similique vero quia perspiciatis deleniti id eos eum esse aliquid minus! Nostrum, ipsam? Adipisci voluptate iure fugit!</p>

        </div>
    )
}
