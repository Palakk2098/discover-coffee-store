import { NextRequest, NextResponse } from "next/server";
import { table,getMinifiedRecords,getFilteredRecords} from "../../lib/airtable"
export async function POST(request: NextRequest) {
    try {

        const { id, name, address, neighbourhood, rating, imgUrl } =await request.json();
  
        if(id){

        const result =await getFilteredRecords(id)
 

        if (result.length) {
           
            return NextResponse.json({
                result
            })

        } else {
            if(name){
            const result = await table.create([{
                fields: {
                    id,
                    name,
                    address,
                    neighbourhood,
                    rating,
                    imgUrl
                }
            }])
            const records=getMinifiedRecords(result)

            return NextResponse.json({
                records
            })
        }else{
            return NextResponse.json({
                message: "Error is missing"
            })
        }

        }
    }else{
        return NextResponse.json({
            message: "Id is missing"
        })
    }
    } catch (error) {
        console.log(error,"---error---")
        return NextResponse.json({
            message: "Error finding or creating coffee store"
        })
    }

}

export async function PUT(request: NextRequest) {

    try {
        const { id } =await request.json();
        if (id) {
            const result = await getFilteredRecords(id)

            if (result.length) {

                const record = result[0];
                const updatedRating = parseInt(record.rating) + 1;

            
                const updatedRecord=await table.update([
                    {
                      "id": record.recordId,
                      "fields": {
                        "rating": updatedRating
                      }
                    },
                   
                  ]);

                  const minifiedRecord=await getMinifiedRecords(updatedRecord);
                return NextResponse.json(minifiedRecord)

            } else {
                return NextResponse.json({
                    message: "Id not found"
                });
            }

        } else {
            return NextResponse.json({
                message: "Id is missing"
            });
        }
    } catch (error) {
        console.log(error,"---error---")
        return NextResponse.json({
            error: error
        });
    }
}
export async function GET(request: NextRequest) {

    try {
        const id = request.nextUrl.searchParams.get("id")
        if (id) {
            const result = await getFilteredRecords(id);

            if (result.length) {

                return NextResponse.json({
                    result
                })

            } else {
                return NextResponse.json({
                    message: "Id not found"
                });
            }

        } else {
            return NextResponse.json({
                message: "Id is missing"
            });
        }
    } catch (error) {
        return NextResponse.json({
            error: error
        });
    }
}


