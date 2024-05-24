import React from 'react'

export default function Carousal() {
    return (
        <div ><div id="carouselExampleFade" className="carousel slide carousel-fade " data-bs-ride="carousel" style={{objectFit:"contain !important"}}>
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <img style={{maxHeight: "850px"}} src="https://source.unsplash.com/random/300×300/?meal" className="d-block w-100" alt="..."/>
                </div>
                <div className="carousel-item">
                    <img style={{maxHeight: "850px"}} src="https://source.unsplash.com/random/300×300/?dinner" className="d-block w-100" alt="..."/>
                </div>
                <div className="carousel-item">
                    <img style={{maxHeight: "850px"}} src="https://source.unsplash.com/random/300×300/?lunch" className="d-block w-100" alt="..."/>
                </div>
            </div>
            <button className="carousel-control-prev " type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next " type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div></div>
    );
}
