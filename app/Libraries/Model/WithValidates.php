<?php
/**
 * Created by Hera Portal.
 * User: Peter Fan(peter.fan@codelocks.hk)
 * Date: 2019/7/12 13:26
 */

namespace App\Libraries\Model;

use Illuminate\Contracts\Validation\Factory;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;
use Illuminate\Validation\Validator;

/**
 * Trait WithValidates
 * afterValidate(Validator $validate)
 * @package App\Libraries\Model
 */
trait WithValidates
{

    protected array $afterValidators = [];
    public array $rules = [];
    protected array $customMessages = [];
    protected array $customAttributes = [];

    /**
     * @param  array  $rules
     * @param  array  $messages
     * @param  array  $customAttributes
     *
     * @return array
     * @throws ValidationException
     */
    public function validate(array $rules = [], array $messages = [], array $customAttributes = []): array
    {
        $validator = $this->getValidator($rules, $messages, $customAttributes);
        return $this->validateWith($validator);
    }

    /**
     * @param  array  $rules
     * @param  array  $messages
     * @param  array  $customAttributes
     * @return \Illuminate\Contracts\Validation\Validator
     */
    protected function getValidator(
        array $rules = [],
        array $messages = [],
        array $customAttributes = []
    ): \Illuminate\Contracts\Validation\Validator {
        if (empty($rules) && property_exists($this, 'rules')) {
            $rules = $this->rules;
        }
        if (empty($messages) && property_exists($this, 'customMessages')) {
            $messages = $this->customMessages;
        }
        if (empty($customAttributes) && property_exists($this, 'customAttributes')) {
            $customAttributes = $this->customAttributes;
        }
        return $this->getValidationFactory()->make($this->getAttributes(), $rules, $messages, $customAttributes);
    }

    /**
     * Get a validation factory instance.
     * @return Factory
     */
    protected function getValidationFactory(): Factory
    {
        return app(Factory::class);
    }

    /**
     * @param  array|Validator  $validator
     *
     * @return array
     * @throws ValidationException
     */
    public function validateWith(Validator|array $validator): array
    {
        if (is_array($validator)) {
            $validator = $this->getValidator($validator);
        }
        foreach ($this->afterValidators as $event) {
            $validator->after($event);
        }
        if ($validator->fails()) {
            Log::debug('validate failed', $validator->errors()->all());
            throw new ValidationException($validator);
        }
        return $validator->validated();
    }

    public function setRules($rules): void
    {
        $this->rules = $rules;
    }

    public function appendRules($rules): void
    {
        $this->rules = array_merge($this->rules??[], $rules);
    }

    public function afterValidate(callable $validate): void
    {
        $this->afterValidators[] = $validate;
    }
}
