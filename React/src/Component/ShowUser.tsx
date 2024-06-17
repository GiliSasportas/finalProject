


export const ShowUser = (prop: { item: any }) => {
    return (
        //  <tbody>
       
    //  <li><div> { prop.item }</div></li>
    <tr>
     <td>{prop.item.address}</td>
    <td>{prop.item.phone}</td>
    <td>{prop.item.lastname}</td>
    <td>{prop.item.firstname}</td>
  </tr>

        // </tbody>

    )
}
