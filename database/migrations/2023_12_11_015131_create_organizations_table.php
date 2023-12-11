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
        Schema::create('organizations', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('owner_id')->nullable();
            $table->foreignUuid('parent_id')->nullable();
            $table->string('name', 50);
            $table->text('description')->nullable();
            $table->string('status', 50)->nullable()->default('active');
            $table->unsignedMediumInteger('level')->default(0);
            $table->unsignedMediumInteger('sort')->default(0); // used for display sort
            $table->timestamps();

            $table->index(['user_id','owner_id'], 'i_org_users');
            $table->index(['level','sort'], 'i_display_sort');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('organizationals');
    }
};
