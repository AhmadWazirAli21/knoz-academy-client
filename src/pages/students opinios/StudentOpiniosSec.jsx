
import './studentOpinionsSec.css'
import Card from '../card/Card'
import photo1 from '../../assets/cardphoto1.jpg'
import photo2 from '../../assets/cardphoto2.jpg'
import photo3 from '../../assets/cardphoto3.jpg'

function StudentOpiniosSec() {
    return (
        <section className='students-op'>
            <div className="section-header">
                <h2>What our student says</h2>
            </div>
            <div className="card-container">
                <Card name={'student1'} photo={photo1}/>
                <Card name= {'student2'} photo={photo2}/>
                <Card name={'student3'} photo={photo3}/>
            </div>
        </section>
    )
}

export default StudentOpiniosSec
