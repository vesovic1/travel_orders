<?php

namespace TravelOrdersCore;

class EntityDTO {

    public function fromArray(mixed $properties=[])
    {
        if (method_exists($this, '__mapProperties')) {
            $properties = static::__mapProperties($properties); /** @phpstan-ignore-line */
        }
        foreach ($properties as $propKey => $propValue) {
            $this->_setter($propKey, $propValue);
        }
        $this->__postMap();
    }

    public function __postMap()
    {

    }

    public function __invoke()
    {
        return $this->get();
    }

    public function get(): object
    {
        $class = new \ReflectionObject($this);
        $properties = $class->getProperties(); // get class properties

        $dto = new \stdClass();

        foreach ($properties as $property) {
            // // skip inherited properties
            // if ($property->getDeclaringClass()->getName() !== $class->getName()) {
            //     continue;
            // }

            if (in_array($property->getName(), ['query', 'mongo'])) {
                continue;
            }

            $dto->{$property->getName()} = $this->{$property->getName()};
        }

        return $dto;
    }

    public function __set($property, $value)
	{
		return $this->_setter($property, $value); /** @phpstan-ignore-line */
	}

    public function _setter($property, $value) {

		// if (!property_exists($this, $property)) {
        //     return;
        // }

        $propertyValidator = 'validate'.ucwords($property);

        if (method_exists($this, $propertyValidator)) {
            $this->$propertyValidator($value);
        }

        $propertySetter = 'set'.ucwords($property);

        if (method_exists($this, $propertySetter)) {
            $this->$propertySetter($value);
        } else {
            $this->{$property} = $value;
        }

		return $this;
	}

    public function __get($property) {

        $propertyGetter = 'get'.ucwords($property);

        if (method_exists($this, $propertyGetter)) {
            $this->$propertyGetter();
        }

        return $this->{$property};
    }

}