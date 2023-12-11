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
        Schema::create('user_options', function (Blueprint $table) {
            $table->uuid('user_id');
            $table->string('key', 100);
            $table->text('value')->nullable();
            $table->primary(['user_id','key']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_options');
    }
};
