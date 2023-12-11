<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('name');
            $table->foreignUuid('organization_id')->nullable();  // current organization, if not exists, will ge the first of owned teams
            $table->string('email')->unique();
            $table->string('phone_number')->nullable();  // can sign in with phone number
            $table->string('avatar')->nullable();
            $table->timestamp('email_verified_at')->nullable();
            $table->dateTime('last_login_at')->nullable();
            $table->string('password');
            $table->text('description')->nullable();
            $table->boolean('is_admin')->nullable();
            $table->mediumInteger('level')->nullable()->default(10); // user level 0,10,20,30,40,50
            $table->string('status', 50)->nullable()->default('active');
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
