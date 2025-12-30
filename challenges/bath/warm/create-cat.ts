// REASON: This function is warm because it creates and returns a fully initialized object. All its properties are set immediately during creation.
export function createCat() {
	class Cat {
		name: string;
		age: number;
		constructor(name: string, age: number) {
			this.name = name;
			this.age = age;
		}
		meow() {
			return `${`this.name`} says meow!`;
		}
	}
	return new Cat('Whiskers', 5);
}
