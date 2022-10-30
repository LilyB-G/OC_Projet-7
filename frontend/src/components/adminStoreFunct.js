
export default function groupVal(obj) {

    let filter = [];
    let j = 0;


    for (let i in obj) {
        //console.log(obj[i]);
        if (filter.length > 0 ) {
            
            if (filter[j].UserId == obj[i].UserId) {

                checkValExists(obj[i], filter);

            } else {

                filter.push(obj[i]);
                j++

            };
        }else{
            filter.push(obj[i]);
            
        };

    };
    //console.log(filter);
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
