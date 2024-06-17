import './Galery.css';
export const Galery = () => {


    return (
        <>
           

            <div style={{ marginTop: '100px', textAlign: 'center' }}>
                <h1>חוויות מהבית הספר</h1>
                <div style={{textAlign: 'center'}}>
                    <img id='img' src="/src/assets/images/12.jpg" height="280"></img>
                    <img id='img' src="/src/assets/images/13.jpg" height="280"></img>
                    <img id='img' src="/src/assets/images/20.png" height="280"></img>
                </div>
                <div style={{textAlign: 'center'}}>
                    <img id='img' src="/src/assets/images/16.png" height="280"></img>
                    <img id='img' src="/src/assets/images/18.png" height="280"></img>
                    <img id='img' src="/src/assets/images/17.png" height="280"></img>
                </div>
                <div style={{textAlign: 'center'}}>
                    <img id='img' src="/src/assets/images/6.jpg" height="280"></img>
                    <img id='img' src="/src/assets/images/21.png" height="280"></img>
                    <img id='img' src="/src/assets/images/17.jpg" height="280"></img>
                </div>
            </div>
        </>
    )
}