/* export default function groupVal(obj) {

    const filter = [];
    let newEntrie = true;

    for (let obj[i] of obj) {
        newEntrie = true;

        for (const prevObj of filter) {
            //console.log(prevObj);

            if (prevObj.IdUser == obj[i].UserId) { // existance d'une ligne
                newEntrie = false;
                prevObj.ActionDroit = prevObj.ActionDroit + '|' + obj[i].ActionDroit;
                prevObj.IdDroits = prevObj.IdDroits + '|' + obj[i].IdDroits;
                if (prevObj.NiveauDroit != obj[i].NiveauDroit) {
                    prevObj.NiveauDroit = prevObj.NiveauDroit + '|' + obj[i].NiveauDroit;
                }
                prevObj.DateCreaDroit = prevObj.DateCreaDroit + '|' + obj[i].DateCreaDroit;
                prevObj.DateModifDroit = prevObj.DateModifDroit + '|' + obj[i].DateModifDroit;
            }
        };

        if (newEntrie == true) {
            filter.push(obj[i]);

            console.log(filter);
        }


    };
    //console.log(filter);
    return filter;
};

 */

export default function groupVal(obj) {

    let filter = [];
    let j = 0;

    filter[0]= '';

    for (let i in obj) {
        //console.log(obj[i]);

        if ( filter[j].UserId == obj[i].UserId ) {
            
            checkValExists(obj[i],filter);
            
        } else {
            filter.push(obj[i]);
            j++
            
        };

    };
    console.log(filter);
    return filter;
};

function checkValExists(currentObj, filter) {
    for (const prevObj of filter) {
        //console.log(prevObj);

        if (prevObj.IdUser == currentObj.UserId && !String(prevObj.IdDroits).includes(String(currentObj.IdDroits))) { // existance d'une ligne

            prevObj.ActionDroit = prevObj.ActionDroit + '|' + currentObj.ActionDroit;
            prevObj.IdDroits = prevObj.IdDroits + '|' + currentObj.IdDroits;
            if (prevObj.NiveauDroit != currentObj.NiveauDroit) {
                prevObj.NiveauDroit = prevObj.NiveauDroit + '|' + currentObj.NiveauDroit;
            }
            prevObj.DateCreaDroit = prevObj.DateCreaDroit + '|' + currentObj.DateCreaDroit;
            prevObj.DateModifDroit = prevObj.DateModifDroit + '|' + currentObj.DateModifDroit;


        }

    };
}
