import React from 'react';
import { Row, Col } from 'antd';
import {Link} from 'react-router-dom'

function PetItem({pet}) {
    return (
            <Col xs={24} sm={24} md={12} lg={12} xl={6}>
                <article className="card">
                    <header className="card__thumb">
                        <Link><img src= {pet.images.url} alt=''/></Link>
                    </header>
                    <div className="card__body">
                        <div className="card__category"><Link>{pet.status}</Link></div>
                        <h2 className="card__title"><Link>{pet.name}</Link></h2>
                        <div className="card__subtitle">Giới tính: {pet.sex}</div>
                        <p className="card__description">{pet.moreinfor}</p>
                    </div>
                </article>
            </Col>
    );
}

export default PetItem;