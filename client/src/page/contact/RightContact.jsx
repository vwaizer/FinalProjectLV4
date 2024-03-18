import React from 'react'

const RightContact = ({text, Addname, title1, title2, title3}) => {
  return (
    <div class="C-sub-column_3">
        <div>
            <p> {text}
                <b>{Addname}</b>
            </p>
        </div>
        <div class="C-store-information">
            <i class="bi bi-envelope-fill"></i>
            <p className="social-label">{title1}</p>
        </div>
        <div class="C-store-information">
            <i class="bi bi-telephone-fill"></i>
            <p className="social-label">{title2}</p>
        </div>
        <div class="C-store-information">
            <i class="bi bi-geo-alt-fill"></i>
            <p className="social-label">{title3}</p>
        </div>
    </div>
  )
}

export default RightContact