export const ShowRadioSubject = (prop: { item: string, key: string, id: string,choose:any }) => {
  console.log(prop.id, "id");


  return <>
    <label>{prop.item}</label>
    <input type="radio" id={prop.id} name="radioSubject" value={prop.item} onChange={e=>{prop.choose(e.target.id,e.target.value)}} />
  </>
}