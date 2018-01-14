import {Some, None, Option, EqOption, sequence} from '../../src/utils/Option'

describe("Option Test", () => {
    //check here for reference http://rea.tech/introduction-to-option-and-either-types-in-js-part-1/

    it("Creating a Some & None type based on value, Option Monad", () => {
        const noneType1 = Option(null);
        const noneType2 = Option(undefined);
        const someType = Option("someValue");

        expect(EqOption(noneType1, None)).toBe(true);
        expect(EqOption(noneType2, None)).toBe(true);
        expect(EqOption(someType, Some("someValue"))).toBe(true);
    });

    it("Modifying a value in Option, functor operation", () => {
        const arr = [1, 2, 3];
        const noneType = Option(arr[4]);
        const someType = Option(arr[2]);

        expect(EqOption(noneType.map(x => x * x), None)).toBe(true);
        expect(EqOption(someType.map(x => x * x), Some(9))).toBe(true);
    });

    it("Modifying and getting the value in Option", () => {
        const arr = [1, 2, 3];
        const noneType = Option(arr[4]);
        const someType = Option(arr[2]);

        expect(noneType.map(x => x * x).fold(_ => -1, _ => _)).toEqual(-1);
        expect(someType.map(x => x * x).fold(_ => -1, _ => _)).toEqual(9);
    });

    it("Dealing with nested Some/None, Monadic bind/flatMap operation", () => {
        const head = (arr) => Option(arr[0])

        const someOfarr1 = Some([1, 2, 3]);
        const someOfarr2 = Some([]);

        const someType1 = someOfarr1.flatMap(a => head(a));
        const someType2 = someOfarr2.flatMap(a => head(a));

        expect(EqOption(someType1, Some(1))).toBe(true);
        expect(EqOption(someType2, None)).toBe(true);
    });

    it("sequencing list of option to option of list",() => {
        const arr = [Option(1),Option(2),None,Option(4),None];
        expect(sequence(arr).fold(_ => _,_ => _)).toEqual([1,2,4])
    });

    it("using monad composition like scala's for expression/ Haskell's do syntax 1", () => {
        /*const getBedrooms = data => {
              const bedrooms = data.listing && data.listing.features && data.listing.features.bedrooms;
              if (bedrooms) {
                  return bedrooms.value;
              }
              return 0;
            };*/

        const getBedrooms = data =>
            Option(data.listing)
                .flatMap(listing => Option(listing.features))
                .flatMap(features => Option(features.bedrooms))
                .map(bedrooms => bedrooms.value)
                .fold(() => 0, v => v);

        expect(getBedrooms({
                listing: {
                    features: {
                        bedrooms: {
                            value: 3
                        }
                    }
                }})).toEqual(3)

        expect(getBedrooms({
            listing: {
                bedrooms: {
                    value: 3
                }
            }})).toEqual(0)
    })

    it("using monad composition like scala's for expression/ Haskell's do syntax 2", () => {
        const inputData = {
            listing: {
                features: {
                    bedrooms:3
                }
            },
            type: {
                property: {
                    openArea:"plot"
                },
                building: {
                    floors:5
                },
                villae:{
                    rooms:6
                }
            }
        };
        const getProps = data =>
            Option(data.listing)
                .flatMap(_ => Option(data.type))
                .flatMap(_ => Option(data.type.villae))
                .flatMap(_ => Option(data.type.building))
                .flatMap(_ => Option(data.type.building.floors))
                .flatMap(_ => Option(data.type.villae.rooms))
                .map(_ => data.type.building.floors * data.type.villae.rooms)
                .fold(() => -1, v => v)

        expect(getProps(inputData)).toEqual(30)

        expect(getProps({
            listing: {
                bedrooms: {
                    value: 3
                }
            }})).toEqual(-1)
    })

});