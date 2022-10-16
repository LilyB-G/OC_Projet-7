export default function groupVal(obj) {

    const filter = [];

    for (let line of obj) {

        if (line.UserId == line.IdUser) {

            filter.push({'IdUser' : line.IdUser,'ActionDroit' : line.ActionDroit , 'NiveauDroit': line.NiveauDroit});
            
        };

    };
    //console.log(filter);
    return filter;
};

