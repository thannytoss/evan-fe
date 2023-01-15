
import { useLayoutEffect } from "react";
import Sketch from "react-p5";
import p5Types from "p5"; //Import this for typechecking and intellisense
import GalaxyManager from "./GalaxyManager";
import Planet from "./Planet";
import Galaxy from "./Galaxy";
import GalaxyWebAPI from "./GalaxyWebAPI";
import { setgroups } from "process";

interface IComponentProps { }

export const GalaxyMap: React.FC<IComponentProps> = (props: IComponentProps) => {
    let system: StarSystem;
    let starField: number[][];
    let galaxy: any;

    // useLayoutEffect(() => {
    //     GalaxyWebAPI.getInitialGalaxy('https://localhost:5001/GenerateGalaxy?starNumber=12').then(res => {
    //         galaxy = res;
    //     });
    // });

    //setup
        const setup = (p5: p5Types) => {
                starField = GalaxyManager.generateStarFieldCoords(p5 , GalaxyManager.getRandomRange(50, 200))
                console.log(starField);
        }

    //draw
        const draw = (p5: p5Types) => {
                
        }

    class StarSystem {
        x: number;
        y: number;
        center: number;
        radius: number;
        velocity: number;
        p5: p5Types;
        planets: Planet[];

        constructor(p5: p5Types) {
            this.x = 0;
            this.y = 0;
            this.center = 0;
            this.radius = 100;
            this.velocity = 0.01;
            this.p5 = p5;
            this.planets = GalaxyManager.generatePlanets(GalaxyManager.getRandomInt(6));
        };

        drawStar(): void {
            this.p5.fill(200, 0, 0);
            this.p5.ellipse(this.center, this.center, 60, 60);
        };

        drawPlanets(): void {
            this.planets.forEach(planet => {
                planet.theta += planet.velocity;
                planet.x = planet.radiusFromStar * this.p5.cos(planet.theta);
                planet.y = planet.radiusFromStar * this.p5.sin(planet.theta);
                this.p5.fill(planet.color);
                this.p5.ellipse(planet.x, planet.y, 30, 30);
            });
        };

        drawMoons(): void {
            this.p5.fill(130, 0, 255);
            this.planets.forEach(planet => {
                planet.moons.forEach(moon => {
                    moon.theta += moon.velocity;
                    moon.x = planet.x + (moon.radiusFromPlanet * this.p5.cos(-moon.theta - 5));
                    moon.y = planet.y + (moon.radiusFromPlanet * this.p5.sin(-moon.theta - 5));
                    this.p5.ellipse(moon.x, moon.y, moon.diameter, moon.diameter);
                });
            });
        };
    }

    return <Sketch setup={setup} draw={draw} />;
};