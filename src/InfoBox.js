import { Card, CardContent,  Typography } from "@material-ui/core";
import React from "react";
function InfoBox({titile, cases, total}){
    return (
        <Card>
            <CardContent>


                {/* Titile i.e Coronavirus Cases */}

                <Typography className="infoBox__title" color="textSecondary">
                    {titile}
                </Typography>

                {/**+120 Number of cases  */}
                <h2 className="infoBox__cases">{cases}</h2>
                {/**1.2M Total   */}
                <Typography className="infoBox__total" color="textSecondary">
                    {total} Total    
                </Typography>
            </CardContent>
        </Card>
    )
}

export default InfoBox